import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="/auth/google"
          rel="noopener noreferrer"
        >
          Sign in with Google
        </a>

        <a
          className="App-link"
          href="/auth/linkedin"
          rel="noopener noreferrer"
        >
          Sign in with LinkedIn
        </a>

      </header>
    </div>
  );
}

export default App;
