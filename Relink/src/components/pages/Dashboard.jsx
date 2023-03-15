import Greeting from "../Greeting";
import Label from "../materials/Label";
import List from "../materials/List";
import Homeheader from "../headers/Homeheader";
import Word from "../materials/Word";
import Material from "../materials/Material";

export default function Dashboard() {
  return (
    <main className="main-content">
      <Homeheader headerTitle="Home" />
      <Greeting />
      <Label name="Recently Added" />
      <List title1="Title" title2="Added" title3="Type">
        <Material title="无法为佛叫我" added="March 23th, 2023" type="Book" />
      </List>
      <Label name="New Words" />
      <List title1="Word" title2="Definition" title3="HSK">
        <Word word="食欲" pinyin="shi yu" def="Appitite" hsk="Level 4" />
        <Word word="屁股" pinyin="pi gu" def="Buttocks" hsk="Level 6" />
      </List>
    </main>
  );
}
