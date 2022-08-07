import { Component, ChangeEvent } from "react";
import BookDataService from "../services/book.service";
import { Link } from "react-router-dom";
import IBookData from '../types/book.type';

type Props = {};

type State = {
  books: Array<IBookData>,
  currentBook: IBookData | null,
  currentIndex: number,
  searchTitle: string
};

export default class BookList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then((response: any) => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book: IBookData, index: number) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchByTitle() {
    this.setState({
      currentBook: null,
      currentIndex: -1
    });

    BookDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, books, currentBook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Book List</h4>

          <ul className="list-group">
            {books &&
              books.map((book: IBookData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  {book.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBooks}
          >
            Remove All Books
          </button>
        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBook.description}
              </div>
              <div>
                <label>
                  <strong>Availability:</strong>
                </label>{" "}
                {currentBook.available ? "Available" : "Lent"}
              </div>

              <Link
                to={"/books/" + currentBook.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Choose a Book</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
