import React from "react";
import Button from "react-bootstrap/Button";

// Half a second waiting between fetching the search
const WAIT_INTERVAL = 500;

export default class ImageSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    this.triggerChange = this.triggerChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange(e) {
    // If user pressed a new key- we want to start the timeout again
    clearTimeout(this.timer);

    this.setState({ searchText: e.target.value });

    // We call the function that change the value on the perent (hence fire the http request) only after timeout
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  triggerChange() {
    const { searchText } = this.state;

    this.props.updateSearch(searchText);
  }

  render() {
    // const { searchText } = this.state;

    return (
      <div>
        <Button
          variant="primary"
          style={{ position: "absolute", left: "5px", top: "5px" }}
          onClick={()=> this.props.clearSearchHistory()}
        >
          Clear History
        </Button>
        <h3>Image Gallery</h3>
        <input
          type="text"
          value={this.state.searchText}
          onChange={this.handleChange}
          list="history"
        />
        <datalist id="history">
          {this.props.historyList.map((item, i) => (
            <option key={i} value={item} />
          ))}
        </datalist>
      </div>
    );
  }
}
