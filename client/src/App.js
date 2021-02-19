import "./App.css";
import { Homepage } from "./pages/Homepage";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import { Favorites } from "./pages/Favorites";
import { AddMovies } from "./pages/AddMovie";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { UpdateMovies } from "./pages/UpdateMovie";
import { DetailPage } from "./pages/DetailPage";
import { DetailSeries } from "./pages/DetailTv";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul className="flex bg-gradient-to-r from-gray-500 to-blue-100 p-4">
            <li className="flex-1 font-mono text-gray-700 text-4xl font-black">
              <Link to="/">Home</Link>
            </li>
            <li className="flex-1 font-mono text-gray-700 text-4xl font-black">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="flex-1 font-mono text-gray-700 text-4xl font-black">
              <Link to="/series">Series</Link>
            </li>
            <li className="flex-1 font-mono text-gray-700 text-4xl font-black">
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/movies/add">
            <AddMovies />
          </Route>
          <Route path="/movies/:id">
            <UpdateMovies />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/series">
            <Series />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/movie-detail/:id">
            <DetailPage />
          </Route>
          <Route path="/series-detail/:id">
            <DetailSeries />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
