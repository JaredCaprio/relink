import React from "react";
import PropTypes from "prop-types";
import { Link, redirect } from "react-router-dom";
import Ellipsismenu from "../ui/Ellipsismenu";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export default function Material({ title, added, type, id }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/materials/${id}`)}>
      <div className="list__item" id={id}>
        <div className="list__item-title">{title}</div>
        <div className="list__item-added">
          {dayjs(added).format("MMMM D, YYYY h:mm A")}
        </div>
        <div className="list__item-type">{type}</div>
        <Ellipsismenu type="materials" id={id} redirect="readinglist" />
      </div>
    </div>
  );
}

Material.propTypes = {
  title: PropTypes.string.isRequired,
  added: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
};
