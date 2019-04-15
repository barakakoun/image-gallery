import React from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import ImageSearchBar from "./components/ImageSearchBar";
import GalleryResults from "./components/GalleryResults";
import "./App.css";

const HISTORY_SEARCH_TERMS = "search history";

// For "OR" operation
// Returns concat of two arrays without duplicates
Array.prototype.or = function(arr) {
  let a = this.concat(arr);
  let b = [];
  for (let i = 0; i < a.length; i++) {
    if (typeof b[a[i]] === "undefined") {
      b[a[i]] = true;
      continue;
    }
    a.splice(i--, 1);
  }
  return a;
};

// For "AND" operation
// Returns array with only elements who appear in both arrays
Array.prototype.and = function(b) {
  let arr = this.concat();

  let t = [];
  for (let i = 0; i < b.length; i++) {
    t[b[i]] = true;
  }

  for (let i = 0; i < arr.length; i++) {
    if (typeof t[arr[i]] === "undefined") arr.splice(i--, 1);
  }

  return arr;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArray: [],
      searchText: "",
      refreshing: false,
      error: "",
      searchHistory: [],
      multipleResultsMode: "1", // 2: or, 3: and
      queryText: "",
    };
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
    this.setState({ searchHistory: [] });
  };

  async getImages() {
    try {
      let searchText = this.state.searchText;
      let imageArray = [];

      // Mechanism to make sure we don't fetch while there's request in process
      if (!this.state.refreshing) {
        this.setState({ refreshing: true });

        // If the search term is in history, return the results from the local storage
        if (this.state.searchHistory.indexOf(searchText) > -1) {
          console.log(`Results for ${searchText} came from LOCAL STORAGE`);

          imageArray = JSON.parse(localStorage.getItem(searchText));
          
        } else {
          // Otherwise, fetch from server
          console.log(`Results for ${searchText} came from SERVER`);
          let response = await axios.get(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${searchText}`
          );

          console.log("HEYYYYYYY");

          imageArray = response.data.photos.photo.map(
            photoItem =>
              `https://farm${photoItem.farm}.staticflickr.com/${
                photoItem.server
              }/${photoItem.id}_${photoItem.secret}_q.jpg`
          );

          // Save result to local storage
          localStorage.setItem(searchText, JSON.stringify(imageArray));

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
        }

        var text = this.state.queryText;

        // We won't do or/and with empty array
        if (this.state.imageArray.length > 0) {
          if (this.state.multipleResultsMode === "2") {
            // "OR"
            imageArray = imageArray.or(this.state.imageArray);
            text += ` OR `;
          } else if (this.state.multipleResultsMode === "3") {
            // "AND"
            imageArray = imageArray.and(this.state.imageArray);
            text += ` AND `;
          }
        }

        text += searchText;
    
        if (searchText === this.state.searchText)
          this.setState({
            imageArray, // Updating the image array
            refreshing: false,
            queryText: text,
          });
          console.log(this.state.queryText);
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
    let imageArray = [], text = "";

    // Only if we in single mode will we reset the imageArray and text query, otherwise we need to keep the last result
    if (this.state.multipleResultsMode !== "1") {
      imageArray = this.state.imageArray;
      text = this.state.queryText;
    }

    this.setState(
      {
        searchText,
        refreshing: false, // So it will override current loading
        imageArray: imageArray,
        queryText: text,
      },
      () => {
        if (this.state.searchText !== "") this.getImages();
      }
    );
  };

  multipleModeChanged = e => {
    this.setState({ multipleResultsMode: e.target.value });
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
        <div style={resultsDiv}>
          {this.state.refreshing ? (
            <Spinner style={{ marginTop: "20px" }} animation="border" />
          ) : (
            <GalleryResults images={this.state.imageArray} />
          )}
        </div>
        <select
          value={this.state.multipleResultsMode}
          onChange={this.multipleModeChanged}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <option value="1">Single</option>
          <option value="2">Or</option>
          <option value="3">And</option>
        </select>
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
  borderBottom: "1px solid grey"
};

const resultsDiv = {
  width: "100%",
  height: "90vh",
  overflowY: "scroll"
};
