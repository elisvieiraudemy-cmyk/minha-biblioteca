import "../styles/Inicio.css";

function Inicio({ books, categories, onNavigate }) {
  return (
    <section className="reading inicio-page">
      <h2>Bem-vinda à sua biblioteca! ✨</h2>

      <p>Organize suas leituras e acompanhe sua coleção.</p>

      <h3>Minha coleção: {books.length} livros</h3>

      <button onClick={() => onNavigate("cadastro")}>+ Adicionar livro</button>

      <h2>Minhas estantes</h2>

      <div className="book-list">
        {categories.map((item) => {
          const total = books.filter((book) => book.category === item).length;

          return (
            <article className="book-card" key={item}>
              <div className="book-cover">📚</div>

              <div>
                <h3>{item}</h3>
                <p>{total} livros</p>

                <button onClick={() => onNavigate("consulta", item)}>
                  Consultar
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Inicio;
