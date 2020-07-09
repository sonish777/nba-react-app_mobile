import React, { Component } from "react";

import SliderTemplates from "./slider_templates";
import withSpinner from "../../../hocs/withSpinner/withSpinner";

import { firebase, firebaseArticles, firebaseLooper } from "../../../firebase";

class NewsSlider extends Component {
  state = {
    news: [],
    isLoading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      // const response = await axios.get(
      //   `${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`
      // );
      const snapshot = await firebaseArticles.limitToFirst(3).once("value");
      const news = firebaseLooper(snapshot);

      // news.forEach((item, i) => {
      //   firebase
      //     .storage()
      //     .ref("images")
      //     .child(item.image)
      //     .getDownloadURL()
      //     .then((url) => {
      //       news[i].image = url;
      //     });
      // });

      let requests = news.map(async (item, i) =>
        firebase
          .storage()
          .ref("images")
          .child(item.image)
          .getDownloadURL()
          .then((url) => {
            news[i].image = url;
          })
      );

      Promise.all(requests).then(() => {
        // console.log("COMPLETED");
        this.setState({
          isLoading: false,
          news,
        });
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
      });
    }
  }

  render() {
    console.log(this.state);
    const NewComponent = withSpinner(SliderTemplates, this.state.isLoading);

    return this.state.error ? (
      <h4>Something went wrong</h4>
    ) : (
      <NewComponent
        data={this.state.news}
        type={this.props.type}
        settings={this.props.settings}
      />
    );
  }
}

export default NewsSlider;
