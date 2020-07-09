import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// COMPONENTS
import Layout from "./hocs/Layout/layout";

import Home from "./components/Home/home.component";
import NewsArticle from "./components/Articles/News/Post/post.component";
import VideoArticle from "./components/Articles/Videos/Video/video.component";
import NewsMain from "./components/Articles/News/Main/news-main.component";
import VideosMain from "./components/Articles/Videos/VideosMain/video-main.component";
import Signin from "./components/Signin/signin.component";
import Dashboard from "./components/Dashboard/dashboard.component";

import PrivateRoute from "./components/AuthRoute/private-route.component";
import PublicRoute from "./components/AuthRoute/public-route.component";

const Routes = (props) => {
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoute
          user={props.user}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        <PublicRoute
          user={props.user}
          restricted={false}
          path="/news"
          exact
          component={NewsMain}
        />
        <PublicRoute
          user={props.user}
          restricted={false}
          path="/articles/:id"
          exact
          component={NewsArticle}
        />
        <PublicRoute
          user={props.user}
          restricted={false}
          path="/videos/:id"
          exact
          component={VideoArticle}
        />
        <PublicRoute
          user={props.user}
          restricted={false}
          path="/videos"
          exact
          component={VideosMain}
        />
        <PublicRoute
          user={props.user}
          restricted={true}
          path="/signin"
          exact
          component={Signin}
        />
        <PrivateRoute
          path="/dashboard"
          exact
          component={Dashboard}
          user={props.user}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
