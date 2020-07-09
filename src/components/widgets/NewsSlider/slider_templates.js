import React from "react";
import Slick from "react-slick";
import classes from "./news-slider.module.css";
import { Link } from "react-router-dom";

const SliderTemplate = (props) => {
  let template = null;

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...props.settings,
  };

  switch (props.type) {
    case "featured":
      template = props.data.map((item, i) => {
        return (
          <div key={i}>
            <div className={classes.featured}>
              <div
                className={classes.featured__image}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              ></div>
              <Link to={`/articles/${item.id}`}>
                <div className={classes.featured__title}>{item.title}</div>
              </Link>
            </div>
          </div>
        );
      });
      break;

    default:
      return template;
  }

  return <Slick {...settings}>{template}</Slick>;
};

export default SliderTemplate;
