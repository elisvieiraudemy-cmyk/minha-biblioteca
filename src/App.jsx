import { useState } from "react";
import "./styles/global.css";

import Inicio from "./pages/Inicio";
import Cadastro from "./pages/Cadastro";
import Consulta from "./pages/Consulta";
import Detalhes from "./pages/Detalhes";

const categories = [
  "Minha biblioteca",
  "Lista de desejos",
  "Lendo agora",
  "Livros lidos",
];

function App() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState("inicio");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedBook, setSelectedBook] = useState(null);

  function addBook(newBook) {
    setBooks((currentBooks) => [...currentBooks, newBook]);
    setPage("inicio");
  }

  function navigate(destination, category = null) {
    if (category) {
      setSelectedCategory(category);
    }

    setPage(destination);
  }

  function openDetails(book) {
    setSelectedBook(book);
    setPage("detalhes");
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">SEU CANTINHO LITERÁRIO</p>
          <h1>Minha Biblioteca 📚</h1>
          <p>Todos os seus livros em um só lugar.</p>
        </div>
      </header>

      <nav className="book-form">
        <button onClick={() => navigate("inicio")}>Início</button>

        <button onClick={() => navigate("cadastro")}>Cadastrar livro</button>

        <button onClick={() => navigate("consulta")}>Consultar livros</button>
      </nav>

      {page === "inicio" && (
        <Inicio books={books} categories={categories} onNavigate={navigate} />
      )}

      {page === "cadastro" && (
        <Cadastro
          categories={categories}
          onAddBook={addBook}
          onBack={() => navigate("inicio")}
        />
      )}

      {page === "consulta" && (
        <Consulta
          books={books}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onBack={() => navigate("inicio")}
          onOpenDetails={openDetails}
        />
      )}

      {page === "detalhes" && (
        <Detalhes book={selectedBook} onBack={() => navigate("consulta")} />
      )}
    </main>
  );
}

export default App;
