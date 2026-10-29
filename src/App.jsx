import "./style.css";

function App() {
  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">SEU CANTINHO LITERÁRIO</p>
          <h1>Minha Biblioteca</h1>
          <p>Todos os seus livros em um só lugar.</p>
        </div>
        <span className="book-icon">📚</span>
      </header>

      <section className="stats">
        <article className="stat-card">
          <span>📖</span>
          <h2>0</h2>
          <p>Minha biblioteca</p>
        </article>

        <article className="stat-card">
          <span>💛</span>
          <h2>0</h2>
          <p>Lista de desejos</p>
        </article>

        <article className="stat-card">
          <span>✨</span>
          <h2>0</h2>
          <p>Livros lidos</p>
        </article>
      </section>

      <section className="reading">
        <h2>📚 Lendo agora</h2>
        <p>Suas próximas aventuras começam aqui.</p>
      </section>

      <section className="empty">
        <span className="empty-icon">📕</span>
        <h2>Sua estante está esperando!</h2>
        <p>Adicione seu primeiro livro para começar.</p>
        <button
          onClick={() => alert("Nosso próximo passo será criar o cadastro!")}
        >
          + Adicionar livro
        </button>
      </section>
    </main>
  );
}

export default App;
