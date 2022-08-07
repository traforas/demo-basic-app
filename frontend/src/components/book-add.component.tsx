import { Component, ChangeEvent } from "react";
import BookDataService from "../services/book.service";
import IBookData from '../types/book.type';

type Props = {};

type State = IBookData & {
  submitted: boolean
};

export default class BookAdd extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      available: false,
      submitted: false
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  saveBook() {
    const data: IBookData = {
      title: this.state.title,
      description: this.state.description
    };

    BookDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          available: response.data.available,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newBook() {
    this.setState({
      id: null,
      title: "",
      description: "",
      available: false,
      submitted: false
    });
  }

  render() {
    const { submitted, title, description } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>The Book was added</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              Add another Book
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveBook} className="btn btn-success">
              Add Book
            </button>
          </div>
        )}
      </div>
    );
  }
}
