import React from "react";

import VideosList from "../../../widgets/VideosList/videos-list.componet";

const VideosMain = (props) => {
  return (
    <div>
      <VideosList
        type="card"
        title={false}
        start={0}
        amount={8}
        loadmore={true}
      />
    </div>
  );
};

export default VideosMain;
