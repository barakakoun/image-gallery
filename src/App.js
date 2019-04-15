import React from "react";
import axios from "axios";

import ImageSearchBar from "./components/ImageSearchBar";
import GalleryResults from "./components/GalleryResults";
import "./App.css";

const HISTORY_SEARCH_TERMS = "search history";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArray: [],
      searchText: "",
      refreshing: false,
      error: "",
      searchHistory: []
    };

    // this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    // Get all search history (file names) from local storage
    let historyItems = localStorage.getItem(HISTORY_SEARCH_TERMS);
    if (historyItems) {
      this.setState({ searchHistory: JSON.parse(historyItems) });
    }
  }

  clearSearchHistory = () => {
    // Resetting
    localStorage.clear();
    this.setState({searchHistory: []});
  }

  async getImages() {
    try {
      let searchText = this.state.searchText;

      // Mechanism to make sure we don't fetch while there's request in process
      if (!this.state.refreshing) {
        this.setState({ refreshing: true });

        // If the search term is in history, return the results from the local storage
        if (this.state.searchHistory.indexOf(searchText) > -1) {
          console.log(`Results for ${searchText} came from LOCAL STORAGE`);
          this.setState({
            imageArray: JSON.parse(localStorage.getItem(searchText)), // Updating the image array
            refreshing: false
          });
        } else {
          // Otherwise, fetch from server
          console.log(`Results for ${searchText} came from SERVER`);
          let response = await axios.get(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${searchText}`
          );

          let imageArray = response.data.photos.photo;

          if (searchText === this.state.searchText)
            this.setState({
              imageArray, // Updating the image array
              refreshing: false
            });

          this.setState(
            state => ({
              searchHistory: [...state.searchHistory, searchText]
            }),
            () =>
              localStorage.setItem(
                HISTORY_SEARCH_TERMS,
                JSON.stringify(this.state.searchHistory)
              )
          );
          localStorage.setItem(searchText, JSON.stringify(imageArray));
        }
      }
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log(err);
      this.setState({
        error: "There was a problem getting data",
        refreshing: false
      });
    }
  }

  updateSearch = searchText => {
    console.log(searchText);
    this.setState(
      {
        searchText,
        refreshing: false, // So it will override current loading
        imageArray: []
      },
      () => {
        if (this.state.searchText !== "") this.getImages();
      }
    );
  };

  render() {
    return (
      <div className="App">
        <header style={AppHeader}>
          <ImageSearchBar
            updateSearch={this.updateSearch}
            clearSearchHistory={this.clearSearchHistory}
            historyList={this.state.searchHistory}
          />
        </header>
        <GalleryResults images={this.state.imageArray} />
      </div>
    );
  }
}

export default App;

const AppHeader = {
  left: 0,
  top: 0,
  width: "100%",
  height: "10vh",
  backgroundColor: "white",
  borderBottom: "1px solid grey",
};
