import React from 'react';
import axios from "axios";

import ImageSearchBar from './components/ImageSearchBar';
import GalleryResults from './components/GalleryResults';
import './App.css';


const HEADERS = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Origin": "*",
};

const PHOTOS = [
  {
      "id": "7850617192",
      "owner": "32208367@N04",
      "secret": "39dcc60794",
      "server": "7277",
      "farm": 8,
      "title": "raspberry portrait",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "6244719444",
      "owner": "32208367@N04",
      "secret": "50f33d6e7e",
      "server": "6041",
      "farm": 7,
      "title": "puppy love",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8213869545",
      "owner": "32208367@N04",
      "secret": "ba5f58c3c3",
      "server": "8069",
      "farm": 9,
      "title": "it's a dogs life",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8275306370",
      "owner": "32208367@N04",
      "secret": "9b3c49d381",
      "server": "8363",
      "farm": 9,
      "title": "puppy cuddle",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "7011517303",
      "owner": "32208367@N04",
      "secret": "65a8d556b4",
      "server": "7057",
      "farm": 8,
      "title": "puppy dog look!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8575286196",
      "owner": "32208367@N04",
      "secret": "8cdbd10082",
      "server": "8092",
      "farm": 9,
      "title": "the link",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8081161300",
      "owner": "32208367@N04",
      "secret": "05a98282a3",
      "server": "8464",
      "farm": 9,
      "title": "Look into my eyes.....!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8227001028",
      "owner": "32208367@N04",
      "secret": "fec1c79be7",
      "server": "8478",
      "farm": 9,
      "title": "laughing dog",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8197585734",
      "owner": "32208367@N04",
      "secret": "38f52a786c",
      "server": "8060",
      "farm": 9,
      "title": "do not feed the animals",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8200743505",
      "owner": "32208367@N04",
      "secret": "66019416bc",
      "server": "8198",
      "farm": 9,
      "title": "Happy dog!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8539745725",
      "owner": "32208367@N04",
      "secret": "8a32403db9",
      "server": "8512",
      "farm": 9,
      "title": "Jemima as Claude the dog!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8200735487",
      "owner": "32208367@N04",
      "secret": "aeb10f33d6",
      "server": "8209",
      "farm": 9,
      "title": "dog face",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "5687747190",
      "owner": "30120194@N02",
      "secret": "3f73183e4e",
      "server": "5184",
      "farm": 6,
      "title": "Doorstep. Jaisalmer, India",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "5014456690",
      "owner": "30120194@N02",
      "secret": "b500c0ecd5",
      "server": "4149",
      "farm": 5,
      "title": "Pillow. Jodhpur, India",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "5373328610",
      "owner": "16251396@N06",
      "secret": "7ac173b02b",
      "server": "5087",
      "farm": 6,
      "title": "Companionship. Man and dog. Pirot, Serbia, Srbija. Tanjica Perovic Photography.",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "6776314564",
      "owner": "30120194@N02",
      "secret": "2432e19765",
      "server": "7060",
      "farm": 8,
      "title": "Dogs. Varanasi",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "6461322757",
      "owner": "35815638@N04",
      "secret": "71b0c11ff0",
      "server": "7019",
      "farm": 8,
      "title": "Réalisme Darwinien sous titré \"silence y'en a qui dorment ici \" - Darwinian Realism subtitled \"silence, they are folk's who sleep here\". Dog and kitten.",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "4208715473",
      "owner": "21207178@N07",
      "secret": "639b8022e5",
      "server": "2528",
      "farm": 3,
      "title": "Guessing Game: Where is the barking dog? Icy Winter Days in Germany",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8611846416",
      "owner": "43768995@N00",
      "secret": "15bf988145",
      "server": "8524",
      "farm": 9,
      "title": "",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "5345637889",
      "owner": "13889401@N05",
      "secret": "2219be43d4",
      "server": "5249",
      "farm": 6,
      "title": "Garfi-Happy Thanksgiving...",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "8207750065",
      "owner": "30120194@N02",
      "secret": "47732b3f6f",
      "server": "8058",
      "farm": 9,
      "title": "Window, Pondicherry",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "1922925772",
      "owner": "7992704@N05",
      "secret": "d690e6cc3d",
      "server": "2258",
      "farm": 3,
      "title": "RUN",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "6092592048",
      "owner": "8500742@N03",
      "secret": "78ac462a53",
      "server": "6188",
      "farm": 7,
      "title": "Beach Run",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "6846272882",
      "owner": "44292341@N03",
      "secret": "acf8da0890",
      "server": "7176",
      "farm": 8,
      "title": "Paradise For Man & Dog",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "11436215674",
      "owner": "54086289@N03",
      "secret": "e3f5230f2a",
      "server": "7362",
      "farm": 8,
      "title": "Dental Exam",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "13061188915",
      "owner": "55656232@N08",
      "secret": "d6c99e2936",
      "server": "7431",
      "farm": 8,
      "title": "A Beagle running on 2 legs!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "13038652554",
      "owner": "55656232@N08",
      "secret": "7a4918012c",
      "server": "3415",
      "farm": 4,
      "title": "A 14 weeks Jack Russel Terrier puppie!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "13013791975",
      "owner": "55656232@N08",
      "secret": "1c1157560d",
      "server": "2726",
      "farm": 3,
      "title": "A 5 month German Shepherd!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "12987658183",
      "owner": "55656232@N08",
      "secret": "020c7222fb",
      "server": "7342",
      "farm": 8,
      "title": "Havaneser are high flying dogs!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  },
  {
      "id": "12969773233",
      "owner": "55656232@N08",
      "secret": "7596192205",
      "server": "2184",
      "farm": 3,
      "title": "A little longhaired Chihuahua!",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0
  }];

class App extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      imageArray: PHOTOS,
      searchText: "",
      refreshing: false,
      error: "",
    };
    

    this.updateSearch = this.updateSearch.bind(this);
  }

  
  getImages() {
    let searchText = this.state.searchText;

    // Mechanism to make sure we don't fetch while there's request in process
    if (!this.state.refreshing) {
      this.setState({refreshing: true});
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${searchText}`, { headers: HEADERS, crossdomain: true })
      .then(res => {
        let imageArray = res.data.photos.photo;

        // Making sure we are changing the state only if the user didn't type another search
        // term by the time we proccessed the previous search term
        if (searchText === this.state.searchText) 
        this.setState({
          imageArray, // Updating the image array
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({ error: "There was a problem getting data", refreshing: false });
      });
    }
  }

  updateSearch = searchText => {
    console.log(searchText);
    this.setState({ searchText, 
                    refreshing: false, // So it will override current loading
                    imageArray: []}, () => {
      if (this.state.searchText !== "") this.getImages();
    });
  };


  render() {
    return (
      <div className="App">
        <header style={AppHeader}>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <ImageSearchBar updateSearch={this.updateSearch} />
        </header>
            <GalleryResults images={this.state.imageArray} />
      </div>
    );
  }
}

export default App;

const AppHeader = {
  // position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "10vh",
  backgroundColor: "white",
};
