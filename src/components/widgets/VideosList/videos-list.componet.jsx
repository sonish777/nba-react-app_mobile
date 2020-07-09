import React, { Component } from "react";

import Button from "../../../ui/Button/button.component";
import classes from "./videos-list.module.css";
import VideosListItem from "./VideosListItem/videos-list-item.component";
import {
  firebaseTeams,
  firebaseVideos,
  firebaseLooper,
} from "../../../firebase";

class VideosList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount,
  };

  async componentDidMount() {
    this.getVideos(this.state.start, this.state.end);
  }

  getVideos = async (start, end) => {
    if (this.state.teams.length < 1) {
      const teamsSnapshot = await firebaseTeams.once("value");
      const teams = firebaseLooper(teamsSnapshot);
      this.setState({
        teams,
      });
    }

    const videosSnapshot = await firebaseVideos
      .orderByChild("id")
      .startAt(start)
      .endAt(end)
      .once("value");

    const videos = firebaseLooper(videosSnapshot);

    this.setState({
      videos: [...this.state.videos, ...videos],
      start,
      end,
    });
  };

  loadMore = () => {
    let newEnd = this.state.end + this.state.amount;
    this.getVideos(this.state.end + 1, newEnd);
  };

  renderVideos = () => {
    let template = null;
    switch (this.props.type) {
      case "card":
        template = (
          <VideosListItem data={this.state.videos} teams={this.state.teams} />
        );
        break;

      default:
        template = null;
    }

    return template;
  };

  render() {
    return (
      <div className={classes.videoslist}>
        {this.props.title ? (
          <h3>
            <strong>NBA</strong>
            Videos
          </h3>
        ) : null}

        {this.renderVideos()}

        {this.props.loadmore ? (
          <Button type="loadmore" onClickHandler={this.loadMore}>
            Load More Videos
          </Button>
        ) : (
          <Button type="linkto" link="/videos">
            More Videos
          </Button>
        )}
      </div>
    );
  }
}

export default VideosList;
