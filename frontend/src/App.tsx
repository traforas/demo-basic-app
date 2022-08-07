import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import BookAdd from "./components/book-add.component";
import Book from "./components/book.component";
import BookList from "./components/book-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark">
          <Link to={"/books"} className="navbar-brand">
            <img src="/logo.png" className="logo" alt="Bunnyshell" />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/books/add"} className="nav-link">
                Add Book
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/books"]} component={BookList} />
            <Route exact path="/books/add" component={BookAdd} />
            <Route path="/books/:id" component={Book} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
