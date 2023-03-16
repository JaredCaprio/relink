import React from "react";
import PropTypes from "prop-types";
import { Link, redirect } from "react-router-dom";
import Ellipsismenu from "../ui/Ellipsismenu";
import { useNavigate } from "react-router-dom";
export default function Material({ title, added, type, id }) {
  const navigate = useNavigate();
  /*   const openViewMaterial = () => {
    redirect(`/${import.meta.env.VITE_LOCAL_DOMAIN}/materials/${id}`);
  }; */

  return (
    <div onClick={() => navigate(`/materials/${id}`)}>
      <div className="list__item" id={id}>
        <div className="list__item-title">{title}</div>
        <div className="list__item-added">{added}</div>
        <div className="list__item-type">{type}</div>
        <Ellipsismenu type="materials" id={id} />
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
