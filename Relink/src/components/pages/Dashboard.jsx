import Greeting from "../Greeting";
import Label from "../materials/Label";
import List from "../materials/List";
import Homeheader from "../headers/Homeheader";
import Word from "../materials/Word";

export default function Dashboard() {
  return (
    <>
      <Homeheader headerTitle="Home" />
      <Greeting />
      <Label name="Recently Added" />
      <List title1="Title" title2="Added" title3="Type">
        <Word value1="突突大王" value3="March" value4="Book" />
      </List>
      <Label name="New Words" />
      <List title1="Word" title2="Definition" title3="HSK">
        <Word
          value1="食欲"
          value2="shi yu"
          value3="Appitite"
          value4="Level 4"
        />
        <Word value1="屁股" value2="pi gu" value3="Buttocks" value4="Level 6" />
      </List>
    </>
  );
}
