import React from "react";

export default class GalleryResults extends React.Component {
  render() {
    let images = this.props.images || [];
    return (
      <div>
        {// Runningover all the results and add them as a photo item
        images.map((photoItem, i) => <img style={img} key={i} src={photoItem} alt={photoItem} />)
        }
      </div>
    );
  }
}


const img = {
  margin: "10px 15px 10px 15px",
}