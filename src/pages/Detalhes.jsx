import "../styles/Detalhes.css";

function Detalhes({ book, onBack }) {
  if (!book) {
    return (
      <section className="reading detalhes-page">
        <h2>Livro não encontrado 📚</h2>
        <button onClick={onBack}>Voltar</button>
      </section>
    );
  }

  return (
    <section className="reading detalhes-page">
      <button className="detalhes-back" onClick={onBack}>
        ← Voltar para a biblioteca
      </button>

      <div className="detalhes-container">
        <div className="detalhes-cover">
          <span>📖</span>
          <p>Capa do livro</p>
        </div>

        <div className="detalhes-info">
          <span className="detalhes-category">{book.category}</span>

          <h2>{book.title}</h2>

          <h3>Por {book.author}</h3>

          <div className="detalhes-rating">
            ☆ ☆ ☆ ☆ ☆<p>Avaliação ainda não registrada</p>
          </div>

          <div className="detalhes-description">
            <h3>Sobre este livro ✨</h3>
            <p>
              As informações adicionais deste livro poderão ser preenchidas
              aqui.
            </p>
          </div>
        </div>
      </div>

      <div className="detalhes-extra">
        <h3>Minha experiência de leitura 💗</h3>

        <p>Minha resenha:</p>

        <p>
          Você poderá escrever suas impressões e opiniões sobre esta leitura.
        </p>
      </div>
    </section>
  );
}

export default Detalhes;
