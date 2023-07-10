import { Typography } from "neetoui";
import { Link, useParams } from "react-router-dom";
import React from "react";
import classnames from "classnames";

const Item = ({ title, slug }) => {
  const { slug: currentSlug } = useParams();
  return (
    <Link to={`/public/articles/${slug}`}>
      <Typography
        type="body3"
        weight="medium"
        className={classnames("neeto-ui-text-gray-600", {
          "neeto-ui-text-primary-600": slug === currentSlug,
        })}
      >
        {title}
      </Typography>
    </Link>
  );
};

export default Item;
