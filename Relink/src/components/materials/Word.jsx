import React from "react";
import PropTypes from "prop-types";
import Ellipsismenu from "../ui/Ellipsismenu";
import dayjs from "dayjs";

export default function Word({ word, pinyin, def, added, id }) {
  return (
    <div className="list__item">
      <div className="list__item-title-container">
        <div className="list__item-title">{word}</div>
        <div className="list__item-pinyin ">{pinyin}</div>
      </div>
      <div className="list__item-def">{def}</div>
      <div className="list__item-hsk">
        {dayjs(added).format("MMMM D, YYYY")}
      </div>

      <Ellipsismenu type="words" redirect="wordlist" id={id} />
    </div>
  );
}

Word.propTypes = {
  word: PropTypes.string.isRequired,
  pinyin: PropTypes.string.isRequired,
  def: PropTypes.string.isRequired,
  hsk: PropTypes.string,
};
