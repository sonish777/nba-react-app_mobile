import React, { Component } from "react";

import Header from "./header.component";
import classes from "../../articles.module.css";
import VideosRelated from "../../../widgets/VideosList/VideosRelated/videos-related.component";
import {
  firebaseDB,
  firebaseLooper,
  firebaseVideos,
  firebaseTeams,
} from "../../../../firebase";

class VideoArticle extends Component {
  state = {
    article: [],
    team: null,
    teams: [],
    related: [],
  };

  async componentDidMount() {
    const snapshot = await firebaseDB
      .ref(`videos/${this.props.match.params.id}`)
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
    this.getRelated();
  }

  getRelated = async () => {
    const teamsSnapshot = await firebaseTeams.once("value");
    const teams = firebaseLooper(teamsSnapshot);

    const relatedSnapshot = await firebaseVideos
      .orderByChild("team")
      .equalTo(this.state.article.team)
      .limitToFirst(3)
      .once("value");

    const related = firebaseLooper(relatedSnapshot);

    this.setState({
      teams,
      related,
    });

    // axios.get(`${URL}/teams`).then((response) => {
    //   let teams = response.data;
    //   axios
    //     .get(`${URL}/videos?q=${this.state.team.city}&_limit=3`)
    //     .then((response) => {
    //       // console.log(this.state.team.city);
    //       this.setState({
    //         teams,
    //         related: response.data,
    //       });
    //       // console.log(this.state);
    //     });
    // });
  };

  render() {
    const { article, team } = this.state;
    return (
      <div>
        <Header team={team} />
        <div className={classes.video}>
          <h1>{article.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="250px"
            src={`https://www.youtube.com/embed/${article.url}`}
          ></iframe>
        </div>
        {console.log(this.state)}
        <VideosRelated data={this.state.related} teams={this.state.teams} />
      </div>
    );
  }
}

export default VideoArticle;
