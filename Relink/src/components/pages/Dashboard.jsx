import Greeting from "../Greeting";
import Label from "../materials/Label";
import List from "../materials/List";
import Homeheader from "../headers/Homeheader";
import Word from "../materials/Word";
import Material from "../materials/Material";
import { useLoaderData, Link } from "react-router-dom";
import Emptylist from "../ui/Emptylist";

export default function Dashboard() {
  const dashboardData = useLoaderData();
  console.log(dashboardData);
  const materialsDashboardData = dashboardData.materials;
  const wordsDashboardData = dashboardData.words[0].wordList;

  return (
    <main className="main-content">
      <Homeheader headerTitle="Home" />
      <Greeting />
      <Label name="New Materials" haveLink={true} link="/readinglist" />
      {materialsDashboardData.length > 0 ? (
        <List title1="Title" title2="Added" title3="Type">
          {materialsDashboardData.map((material) => (
            <Material
              key={material._id}
              id={material._id}
              title={material.title}
              added={material.createdAt}
              type={material.type}
              redirect={"home"}
            />
          ))}
        </List>
      ) : (
        <List>
          <Emptylist type="materials" listType="reading list" />
        </List>
      )}

      <Label name="New Words" haveLink={true} link="/wordlist" />

      {wordsDashboardData.length > 0 ? (
        <List title1="Word" title2="Definition" title3="Added">
          {wordsDashboardData
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((word) => (
              <Word
                key={word._id}
                id={word._id}
                word={word.chineseCharacters}
                pinyin={word.pinYin}
                def={word.definition}
                added={word.createdAt}
                redirect="home"
              />
            ))
            .slice(0, 4)}
        </List>
      ) : (
        <List>
          <Emptylist type="words" listType="word list" />
        </List>
      )}
    </main>
  );
}

export const DashboardLoader = async () => {
  const materialDashboardData = await fetch(
    `${import.meta.env.VITE_SERVER_DOMAIN}/dashboard`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  ).catch((err) => console.log(err));
  return materialDashboardData.json();
};
