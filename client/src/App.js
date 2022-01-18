import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import TicketDetails from "./pages/TicketDetails";
import ChangeMovie from "./pages/ChangeMovie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get("/auth/user/auth-check")
      .then((res) => {
        setAuth(res.data);
      })
      .catch((err) => {
        console.log("Error in log in");
      });
  }, []);
  console.log(auth);

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("/auth/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("Error in log in");
      });
  }, []);
  console.log(user);

  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
      .get("/movie/61bc271716ee437d4fbac0b3")
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log("Error in movie data");
      });
  }, []);
  console.log(movie);
  const movieName = movie.data?.name.toLowerCase();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {auth ? <Home user={user} movie={movie} /> : <Register />}
        </Route>
        <Route path="/login"> {auth ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {" "}
          {auth ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path={`/${movieName}`}>
          <MovieDetails user={user} movie={movie} />
        </Route>
        <Route path={`/buy-ticket/${movieName}`}>
          <Booking user={user} movie={movie} />
        </Route>
        <Route path="/change-movie">
          <ChangeMovie />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
