import { useEffect, useState } from "react";
import "../styles/Capas.css";

function Capas({ title, author, onSelectCover }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function searchBooks(searchTitle, searchAuthor) {
    if (!searchTitle.trim() || !searchAuthor.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const query = `intitle:${searchTitle.trim()}+inauthor:${searchAuthor.trim()}`;

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12&printType=books`,
      );

      if (!response.ok) {
        throw new Error("Erro na pesquisa");
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
      setMessage("Não foi possível pesquisar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Pesquisa automática quando título e autor estão preenchidos.
  useEffect(() => {
    if (!title.trim() || !author.trim()) {
      setResults([]);
      setMessage("");
      return;
    }

    const timer = setTimeout(() => {
      searchBooks(title, author);
    }, 900);

    return () => clearTimeout(timer);
  }, [title, author]);

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
    setMessage("Imagem selecionada! 💗");
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

      <p>
        Digite o título e o autor acima. Vamos procurar capas automaticamente
        para você.
      </p>

      <button
        type="button"
        onClick={() => searchBooks(title, author)}
        disabled={loading || !title.trim() || !author.trim()}
      >
        {loading ? "Pesquisando..." : "🔎 Pesquisar novamente"}
      </button>

      {loading && <p>Procurando capas disponíveis...</p>}

      {message && <p className="capas-message">{message}</p>}

      {results.length > 0 && (
        <div className="capas-results">
          <h3>Escolha uma capa</h3>

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
        <h3>Enviar sua própria imagem 📷</h3>

        <input type="file" accept="image/*" onChange={uploadImage} />

        <h3>Ou adicionar uma imagem por URL</h3>

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
