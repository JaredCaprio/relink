import React from "react";
import PropTypes from "prop-types";
export default function Material({ title, added, type, id }) {
  return (
    <div className="list__item" id={id}>
      <div className="list__item-title">{title}</div>
      <div className="list__item-added">{added}</div>
      <div className="list__item-type">{type}</div>
    </div>
  );
}

Material.propTypes = {
  title: PropTypes.string.isRequired,
  added: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
