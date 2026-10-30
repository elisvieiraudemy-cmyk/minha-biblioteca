import "../styles/Consulta.css";

function Consulta({
  books,
  categories,
  selectedCategory,
  onSelectCategory,
  onBack,
  onOpenDetails,
}) {
  const filteredBooks = books.filter(
    (book) => book.category === selectedCategory,
  );

  return (
    <section className="reading consulta-page">
      <h2>Consultar meus livros 📚</h2>

      <label htmlFor="filter">Escolha uma estante:</label>

      <select
        id="filter"
        value={selectedCategory}
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <h3>{selectedCategory}</h3>

      {filteredBooks.length === 0 ? (
        <p>Você ainda não tem livros nesta lista.</p>
      ) : (
        <div className="book-list">
          {filteredBooks.map((book) => (
            <article
              className="book-card"
              key={book.id}
              onClick={() => onOpenDetails(book)}
              style={{ cursor: "pointer" }}
            >
              <div className="book-cover">📖</div>

              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span className="book-category">{book.category}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      <button onClick={onBack}>Voltar ao início</button>
    </section>
  );
}

export default Consulta;
