import React from "react";
import { useLoaderData } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Word from "../materials/Word";
import Emptylist from "../ui/Emptylist";

export default function WordList() {
  const wordList = useLoaderData();

  return (
    <main className="main-content">
      <Homeheader headerTitle="Word List" />
      {wordList.length > 0 ? (
        <List title1="Word" title2="Definition" title3="HSK">
          {wordList
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((word, i) => (
              <Word
                id={word._id}
                key={i}
                word={word.chineseCharacters}
                pinyin={word.pinYin}
                def={word.definition}
                hsk="level 69"
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
