import { useState } from "react";
import "../styles/Capas.css";

function Capas({ initialTitle = "", initialAuthor = "", onSelectCover }) {
  const [title, setTitle] = useState(initialTitle);
  const [author, setAuthor] = useState(initialAuthor);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function searchBooks(event) {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Digite o título do livro.");
      return;
    }

    setLoading(true);
    setMessage("");
    setResults([]);

    try {
      const query = [
        `intitle:${title.trim()}`,
        author.trim() ? `inauthor:${author.trim()}` : "",
      ]
        .filter(Boolean)
        .join("+");

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12&printType=books`,
      );

      if (!response.ok) {
        throw new Error("Não foi possível pesquisar.");
      }

      const data = await response.json();

      const booksWithCovers = (data.items || [])
        .filter((book) => book.volumeInfo?.imageLinks)
        .map((book) => ({
          id: book.id,
          title: book.volumeInfo.title || "Sem título",
          author: book.volumeInfo.authors?.join(", ") || "Autor desconhecido",
          cover:
            book.volumeInfo.imageLinks.thumbnail ||
            book.volumeInfo.imageLinks.smallThumbnail,
        }));

      setResults(booksWithCovers);

      if (booksWithCovers.length === 0) {
        setMessage("Nenhuma capa encontrada. Tente outra pesquisa.");
      }
    } catch (error) {
      setMessage("Ocorreu um erro na pesquisa. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function selectCover(url) {
    onSelectCover(url);
    setMessage("Capa selecionada com sucesso! 💗");
  }

  function uploadImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Selecione um arquivo de imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("A imagem deve ter no máximo 5 MB.");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    selectCover(localUrl);
    setMessage("Imagem carregada! 💗");
  }

  function useImageUrl() {
    if (!imageUrl.trim()) {
      setMessage("Cole o endereço da imagem.");
      return;
    }

    selectCover(imageUrl.trim());
  }

  return (
    <section className="capas-page">
      <h2>Escolha sua capa ✨</h2>

      <form className="capas-search" onSubmit={searchBooks}>
        <label htmlFor="cover-title">Título do livro</label>
        <input
          id="cover-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex.: Orgulho e Preconceito"
        />

        <label htmlFor="cover-author">Autor</label>
        <input
          id="cover-author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Ex.: Jane Austen"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Pesquisando..." : "🔎 Pesquisar capas"}
        </button>
      </form>

      {message && <p className="capas-message">{message}</p>}

      {results.length > 0 && (
        <div className="capas-results">
          <h3>Escolha uma das capas encontradas</h3>

          <div className="capas-grid">
            {results.map((book) => (
              <button
                type="button"
                className="capa-option"
                key={book.id}
                onClick={() => selectCover(book.cover)}
              >
                <img src={book.cover} alt={`Capa de ${book.title}`} />
                <strong>{book.title}</strong>
                <span>{book.author}</span>
                <small>Usar esta capa</small>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="capas-upload">
        <h3>Ou envie sua própria imagem 📷</h3>

        <input type="file" accept="image/*" onChange={uploadImage} />

        <h3>Ou cole o endereço da imagem</h3>

        <input
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="https://..."
        />

        <button type="button" onClick={useImageUrl}>
          Usar imagem por URL
        </button>
      </div>
    </section>
  );
}

export default Capas;
