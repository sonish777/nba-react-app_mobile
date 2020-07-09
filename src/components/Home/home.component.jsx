import React from "react";

import NewsSlider from "../widgets/NewsSlider/news-slider.component";
import NewsList from "../widgets/NewsList/news-list.component";
import VideosList from "../widgets/VideosList/videos-list.componet";

const Home = () => {
  return (
    <div>
      <NewsSlider
        type="featured"
        start={0}
        amount={3}
        settings={{
          dots: false,
        }}
      />
      <NewsList type="card" loadmore={true} start={1} amount={3} />
      <VideosList
        type="card"
        title={true}
        loadmore={true}
        start={0}
        amount={3}
      />
    </div>
  );
};

export default Home;
