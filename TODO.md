# Relink Todo list

### Back burner

- [ ] Make wordList load more words on scroll rather than loading all at once
- [ ] Add chinese translation of site with the ability to switch between english and chinese from a dropdown menu
- [ ] Look into finding a different dictionary api that includes hsk level and aligns more with the word segmenter's "bias"?.
- [ ] ability to add all words from any or all of the HSK levels to word list.
- [ ] Add different ways of logging in like github, facebook, or passport local.

### TODO

- [ ] Create trash bin for deleted materials and words
- [ ] Confirmation dialog before deleting material or word
- [ ] Select multiple words or materials for deleting

### In progress ...

### Need to Review / Refactor

### Done ✓

- [x] ~~If new material started, show alert if user tries to leave page without saving~~ save unsaved material data in session storage and restore when returning to AddMaterial page
- [x] make caret font awesome icon change when a list is being sorted
- [x] need to refactor so the sortWordList() function isn't repeating code in both the wordList and readingList pages
- [x] switch from using D3.js for statistics to using "react-chartjs-2"
- [x] need to add fallback component when there isn't any data in database for user
- [x] Add ability to sort work list and reading list by alphabetically by title, pinyin, definition, material type, or date created.
- [x] Add user profile picture on the landing page next to the dashboard button
- [x] Display a message on the statistics page if there are not materials saved but are words in the wordList
- [x] Client getting known words list from wrong user
- [x] fixed bug with submitting material without editing the body
- [x] work on having the imported text be formatted better for the segmenter, specifically with punctuation
- [x] Fix the buggy positioning of the word def tooltips
- [x] search function in the word list and possibly the reading list
- [x] make readinglist, wordlist, and home page render a message prompting the user to add materials if materials or words are not present for user in DB
- [x] highlight known words in viewmatierals page
- [x] add data viz with d3 for known words stats and added materials
- [x] find an api for getting chinese definitions for words
- [x] make getMaterials route only return materials of logged in user
- [x] getMaterials route returns all materials in db
- [x] Build Component for displaying a single material with the body of it.
- [x] Create edit page for single material
- [x] ellipsis menu popup added, edit and delete button
- [x] Add Delete route and make ellipsis menu delete button hit that endpoint
- [x] Add pop up menu for Homeheader mobile view
- [x] Add to word list button added to definition tooltip
- [x] Format dates on materials/words set by mongodb
- [x] setup loader for dashboard page to get users words and materials
