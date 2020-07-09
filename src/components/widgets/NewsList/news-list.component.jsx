import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Button from "../../../ui/Button/button.component";
import CardInfo from "../CardInfo/card-info.component";
import classes from "./news-list.module.css";
import {
  firebaseArticles,
  firebaseTeams,
  firebaseLooper,
} from "../../../firebase";

class NewsList extends Component {
  state = {
    items: [],
    teams: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount,
    isLoading: true,
  };

  componentDidMount() {
    this.getNews(this.state.start, this.state.end);
  }

  getNews = async (start, end) => {
    if (this.state.teams.length < 1) {
      // const result = await axios.get(`${URL}/teams`);
      // this.setState({
      //   teams: result.data,
      // });
      const teamsSnapshot = await firebaseTeams.once("value");
      const teams = firebaseLooper(teamsSnapshot);
      this.setState({
        teams,
      });
    }

    const articlesSnapshot = await firebaseArticles
      .orderByChild("id")
      .startAt(start)
      .endAt(end)
      .once("value");

    const articles = firebaseLooper(articlesSnapshot);
    this.setState({
      items: [...this.state.items, ...articles],
      start,
      end,
    });
    // const result = await axios.get(
    //   `${URL}/articles?_start=${start}&_end=${end}`
    // );

    // this.setState({
    //   items: [...this.state.items, ...result.data],
    //   isLoading: false,
    // });
  };

  loadMore = () => {
    let newEnd = this.state.end + this.state.amount;
    this.getNews(this.state.end + 1, newEnd);
  };

  renderNews = (type) => {
    let template = null;

    switch (type) {
      case "card":
        template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: classes.newslist__wrapper,
              enterActive: classes.newslist__wrapper__enter,
            }}
            timeout={800}
            key={i}
          >
            <div>
              <div className={classes.newslist__item}>
                <CardInfo
                  teams={this.state.teams}
                  team={item.team}
                  date={item.date}
                />
                <Link to={`/articles/${item.id}`}>
                  <h2>{item.title}</h2>
                </Link>
              </div>
            </div>
          </CSSTransition>
        ));
        break;

      case "cardmain":
        template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: classes.newslist__wrapper,
              enterActive: classes.newslist__wrapper__enter,
            }}
            timeout={800}
            key={i}
          >
            <div>
              <div className={classes.newslist__item}>
                <Link to={`/articles/${item.id}`}>
                  <div className={classes.flex_wrapper}>
                    <div
                      className={classes.left}
                      style={{
                        backgroundImage: `url('/images/articles/${item.image}')`,
                      }}
                    >
                      <div></div>
                    </div>
                    <div className={classes.right}>
                      <CardInfo
                        teams={this.state.teams}
                        team={item.team}
                        date={item.date}
                      />
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </CSSTransition>
        ));
        break;

      default:
        template = null;
    }

    return template;
  };

  render() {
    // const NewsList = (
    //   <div>
    //     <TransitionGroup component="div" className="list">
    //       {this.renderNews(this.props.type)}
    //     </TransitionGroup>
    //     <Button type="loadmore" onClickHandler={this.loadMore}>
    //       Load More News
    //     </Button>
    //   </div>
    // );
    // const NewsListWithSpinner = withSpinner(NewsList, this.state.isLoading);
    // console.log(NewsListWithSpinner)
    // return <NewsListWithSpinner />;
    // console.log(this.state);
    return (
      <div>
        <TransitionGroup component="div" className="list">
          {this.state.items.length > 0
            ? this.renderNews(this.props.type)
            : null}
        </TransitionGroup>
        <Button type="loadmore" onClickHandler={this.loadMore}>
          Load More News
        </Button>
      </div>
    );
  }
}

export default NewsList;
