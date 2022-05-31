import "./App.css";
import Home from "./Home";
import { Route, HashRouter } from "react-router-dom";
import PokeDex from "./PokeDex";
import TestInstructions from "./TestInstructions";

function App() {
  return (
    <HashRouter>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/pokedex" component={PokeDex} />
        <Route path="/testInstructions" component={TestInstructions} />
      </div>
    </HashRouter>
  );
}

export default App;
