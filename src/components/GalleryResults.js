import React from "react";

export default class GalleryResults extends React.Component {
  render() {
    let images = this.props.images || [];
    return (
      <div style={resultsDiv}>
        {// Runningover all the results and add them as a photo item
        images.map((photoItem, i) => {
          let url = `https://farm${photoItem.farm}.staticflickr.com/${photoItem.server}/${photoItem.id}_${photoItem.secret}_q.jpg`;
          return <img style={img} key ={i} src={url} alt={photoItem.id} />;
        })}
      </div>
    );
  }
}


const resultsDiv = {
  width: "100%",
  height: "90vh",
  overflowY: "scroll",
}

const img = {
  margin: "10px 15px 10px 15px",
}