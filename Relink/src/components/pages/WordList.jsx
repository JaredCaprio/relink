import React from "react";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Word from "../materials/Word";

export default function WordList() {
  return (
    <main className="main-content">
      <Homeheader headerTitle="Word List" />
      <List title1="Word" title2="Definition" title3="HSK">
        <Word
          word="正在"
          pinyin="zhèng zài"
          def="just at (that time); right in (that place); right in the middle of (doing something)"
          hsk="Level 3"
        />
        <Word word="薯条" pinyin="shu tiao" def="French Fry" hsk="Level 1" />
      </List>
    </main>
  );
}
