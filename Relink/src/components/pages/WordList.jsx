import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Word from "../materials/Word";
import Searchbar from "../ui/Searchbar";
import sortList from "../utils/sortList";
import { SortingContext } from "../SortingContext";

export default function WordList() {
  const wordList = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWordList, setFilteredWordList] = useState(wordList);
  const [lastClickedTitle, setLastClickedTitle] = useState(3);
  const { sortOrder, setSortOrder } = useContext(SortingContext);

  //Take the value from the input field, update the searchquery and filter the list
  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredList = wordList.filter((word) =>
      word.chineseCharacters.includes(query),
    );
    setFilteredWordList(filteredList);
  };

  //Call the Api and update the filteredList when a word is deleted from the list
  const updateFilteredList = () => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/words`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFilteredWordList(data));
  };

  //Sort current filtered List
  const sortWordList = (e) => {
    const targetID = e.target.id;
    const listTitles = {
      first: "pinYin",
      second: "definition",
      third: "createdAt",
    };
    if (targetID.length < 1) return;
    const sortedList = sortList(
      filteredWordList,
      targetID,
      sortOrder,
      setSortOrder,
      setLastClickedTitle,
      listTitles,
    );
    setFilteredWordList(sortedList);
  };

  return (
    <main className="main-content">
      <Homeheader headerTitle="Word List" />
      <Searchbar
        onChangeFunc={handleSearchQueryChange}
        initValue={searchQuery}
        placeholder="Search with Chinese Characters"
      />
      {filteredWordList && filteredWordList.length > 0 ? (
        <List
          title1={{ title1Id: "pinYin", title1Output: "Word" }}
          title2={{ title2Id: "definition", title2Output: "Definition" }}
          title3={{ title3Id: "createdAt", title3Output: "Added" }}
          sortFunc={sortWordList}
          lastClickedTitle={lastClickedTitle}
        >
          {filteredWordList.map((word, i) => (
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
  }).catch((err) => {
    console.log(err);
  });;

  return words.json();
};
