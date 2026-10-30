import { useState } from "react";
import Capas from "./Capas";
import "../styles/Cadastro.css";

function Cadastro({ categories, onAddBook, onBack }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [cover, setCover] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert("Preencha o título e o autor.");
      return;
    }

    onAddBook({
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      category,
      cover,
    });

    setTitle("");
    setAuthor("");
    setCategory(categories[0]);
    setCover("");
  }

  return (
    <section className="reading cadastro-page">
      <h2>Adicionar um livro 📖</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Digite o título do livro"
        />

        <label htmlFor="author">Autor</label>
        <input
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Digite o nome do autor"
        />

        <label htmlFor="category">Lista</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit">Salvar livro</button>

        <button type="button" onClick={onBack}>
          Voltar ao início
        </button>
      </form>

      <Capas title={title} author={author} onSelectCover={setCover} />

      {cover && (
        <div className="cadastro-cover-preview">
          <h3>Capa selecionada 💗</h3>
          <img src={cover} alt="Capa selecionada para o livro" />
          <button type="button" onClick={() => setCover("")}>
            Remover capa
          </button>
        </div>
      )}
    </section>
  );
}

export default Cadastro;
