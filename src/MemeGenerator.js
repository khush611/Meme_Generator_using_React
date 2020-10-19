import React, { Component } from "react";
// import Header from "./Header"

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "https://i.imgflip.com/345v97.jpg",
      allImages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        console.log(memes[5]);
        this.setState({
          allImages: memes
        });
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const randomNumer = Math.floor(Math.random() * this.state.allImages.length);
    const selectedImage = this.state.allImages[randomNumer].url;
    this.setState({
      randomImage: selectedImage
    });
    console.log(randomImage);
  }
  render() {
    return (
      <>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="textarea"
            value={this.state.topText}
            name="topText"
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <input
            type="textarea"
            value={this.state.bottomText}
            name="bottomText"
            placeholder="Bottom Text"
            onChange={this.handleChange}
          />
          <br />
          <button>Generate Image</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="meme" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </>
    );
  }
}
export default MemeGenerator;
