import React from "react";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";

export default function WordList() {
  return (
    <>
      <Homeheader headerTitle="Word List" />
      <List title1="Word" title2="Definition" title3="HSK" />
    </>
  );
}
