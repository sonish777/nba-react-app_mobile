import React, { Component } from "react";

import classes from "../../articles.module.css";
import Header from "./header.component";
import {
  firebase,
  firebaseDB,
  firebaseLooper,
  firebaseTeams,
} from "../../../../firebase";

class NewsArticle extends Component {
  state = {
    article: [],
    team: null,
    imageURL: "",
  };

  async componentDidMount() {
    const snapshot = await firebaseDB
      .ref(`articles/${this.props.match.params.id}`)
      .once("value");

    let article = snapshot.val();
    // console.log(article);
    const teamsSnapshot = await firebaseTeams
      .orderByChild("teamId")
      .equalTo(article.team)
      .once("value");
    const team = firebaseLooper(teamsSnapshot);

    this.setState({
      article,
      team: team[0],
    });

    this.getImageURL(article.image);

    // axios
    //   .get(`${URL}/articles?id=${this.props.match.params.id}`)
    //   .then((response) => {
    //     let article = response.data[0];
    //     axios.get(`${URL}/teams?id=${article.team}`).then((response) => {
    //       this.setState({
    //         article,
    //         team: response.data[0],
    //       });
    //     });
    //   });
  }

  getImageURL = (filename) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          imageURL: url,
        });
      });
  };

  render() {
    const { article, team } = this.state;
    // console.log(this.state);
    return (
      <div className={classes.article}>
        <Header team={team} date={article.date} author={article.author} />
        <div className={classes.article__body}>
          <h1>{article.title}</h1>
          <div
            className={classes.article__image}
            style={{
              backgroundImage: `url('${this.state.imageURL}')`,
            }}
          ></div>
          <div
            className={classes.article__text}
            dangerouslySetInnerHTML={{
              __html: article.body,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default NewsArticle;
