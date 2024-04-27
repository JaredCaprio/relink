import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Homeheader from "../headers/Homeheader";
import List from "../materials/List";
import Material from "../materials/Material";
import Emptylist from "../ui/Emptylist";
import sortList from "../utils/sortList";
import { SortingContext } from "../SortingContext";

export default function Readinglist() {
  const materials = useLoaderData();
  const [sortedMaterials, setSortedMaterials] = useState(materials);
  const { sortOrder, setSortOrder } = useContext(SortingContext);
  const [lastClickedTitle, setLastClickedTitle] = useState(2);

  //Using imported sortList function to sort the readingList
  const sortReadingList = (e) => {
    const targetID = e.target.id;
    const listTitles = { first: "title", second: "createdAt", third: "type" };
    if (targetID.length < 1) return;
    const sortedReadingList = sortList(
      sortedMaterials,
      targetID,
      sortOrder,
      setSortOrder,
      setLastClickedTitle,
      listTitles,
    );
    setSortedMaterials(sortedReadingList);
  };

  return (
    <main className="main-content">
      <Homeheader headerTitle="Reading List" />
      {sortedMaterials.length > 0 ? (
        <List
          title1={{ title1Id: "title", title1Output: "Title" }}
          title2={{ title2Id: "createdAt", title2Output: "Added" }}
          title3={{ title3Id: "type", title3Output: "Type" }}
          sortFunc={sortReadingList}
          lastClickedTitle={lastClickedTitle}
        >
          {sortedMaterials &&
            sortedMaterials.map((material, i) => (
              <Material
                key={i}
                id={material._id}
                title={material.title}
                added={material.createdAt}
                type={material.type}
                redirect={"readinglist"}
              />
            ))}
        </List>
      ) : (
        <List>
          <Emptylist type="materials" listType="reading list" />
        </List>
      )}
    </main>
  );
}

export const materialsLoader = async () => {
  const materials = await fetch(
    `${import.meta.env.VITE_SERVER_DOMAIN}/materials`,
    {
      credentials: "include",
    },
  ).catch((err) => {
    console.log(err);
  });
  return materials.json();
};
