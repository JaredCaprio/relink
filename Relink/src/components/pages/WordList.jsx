import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Word from "../materials/Word";
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

    setFilteredWordList(filteredList);
  };

  const updateFilteredList = () => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFilteredWordList(data));
    console.log("list updated");
  };

  return (
    <main className="main-content">
      <Homeheader headerTitle="Word List" />
      <Searchbar
        onChangeFunc={handleSearchQueryChange}
        initValue={searchQuery}
        placeholder="Search with Chinese Characters"
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
                updateList={updateFilteredList}
                redirect="wordlist"
              />
            ))}
        </List>
      ) : (
        <List>No Words Found</List>
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
