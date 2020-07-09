import React from "react";

import NewsSlider from "../../../widgets/NewsSlider/news-slider.component";
import NewsList from "../../../widgets/NewsList/news-list.component";

const NewsMain = (props) => {
  return (
    <div>
      <NewsSlider
        type="featured"
        settings={{ dots: false }}
        start={0}
        amount={3}
      />
      <NewsList type="cardmain" loadmore={true} start={3} amount={8} />
    </div>
  );
};

export default NewsMain;
