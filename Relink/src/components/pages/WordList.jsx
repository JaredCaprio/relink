import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Word from "../materials/Word";
import Emptylist from "../ui/Emptylist";
import Searchbar from "../ui/Searchbar";

export default function WordList() {
  const wordList = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWordList, setFilteredWordList] = useState(wordList);

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredList = wordList.filter((word) =>
      word.chineseCharacters.includes(query)
    );
    console.log(filteredList);
    setFilteredWordList(filteredList);
  };

  return (
    <main className="main-content">
      <Homeheader headerTitle="Word List" />
      <Searchbar
        onChangeFunc={handleSearchQueryChange}
        initValue={searchQuery}
      />
      {filteredWordList.length > 0 ? (
        <List title1="Word" title2="Definition" title3="Added">
          {filteredWordList
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((word, i) => (
              <Word
                id={word._id}
                key={i}
                word={word.chineseCharacters}
                pinyin={word.pinYin}
                def={word.definition}
                added={word.createdAt}
              />
            ))}
        </List>
      ) : (
        <List>
          <Emptylist type="words" listType="word list" />
        </List>
      )}
    </main>
  );
}

export const wordListLoader = async () => {
  const words = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words`, {
    credentials: "include",
  });

  return words.json();
};
