import React, { useState } from "react";
import Homeheader from "../headers/Homeheader";
import Searchbar from "../ui/Searchbar";
import List from "../materials/List";
import Definition from "../materials/Definition";

export default function Dictionary() {
  const [dictWords, setDictWords] = useState([]);
  const [blankMessage, setBlankMessage] = "";

  const searchDictionary = (event) => {
    const query = event.target.value;

    if (query.replace(/\s/g, "") < 1) {
      return;
    }
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words/define/${query}`)
      .then((res) => res.json())
      .then((data) => {
        setDictWords(data);
      })
      .catch((error) => {
        setDictWords([]);
        setBlankMessage("No Words Found");
        console.log(error);
      });
  };

  return (
    <main className="main-content">
      <Homeheader headerTitle={"Dictionary"} />
      <Searchbar
        onChangeFunc={searchDictionary}
        placeholder="Enter Chinese characters or Pinyin with tone numbers (e.g. 'ni3 hao3')"
      />
      {dictWords.length > 0 ? (
        <List title1="Word" title2="Definition" title3=" ">
          {dictWords.map((word, i) => (
            <Definition
              key={i}
              simp={word.simplified}
              pinyin={word.pronunciation}
              def={word.definitions}
              fullDef={word}
            />
          ))}
        </List>
      ) : (
        <>{blankMessage}</>
      )}
    </main>
  );
}
