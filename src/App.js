import "./App.css";

function App() {
  return (
    <div className="app">
      <section className="sidebar">
        <button> + New Chat</button>
        <ul className="history">
          <li>Test history</li>
        </ul>
        <nav>
          <p>Varun S</p>
        </nav>
      </section>
      <section className="main">
        <h1>VarunGPT</h1>
        <ul className="feed"> </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input placeholder="Send a message ..." />
            <div id="submit">➢</div>
          </div>
          <p className="info">
            <u>ChatGPT Mar 23 Version.</u> Free Research Preview. ChatGPT may
            produce inaccurate information about people, places, or facts
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
