# Relink App Notes

### March 8th, 2023

- Implimented a log out button that redirects to login page and clears session from server.
- Added Word list route and started building list and listitem components
- changed configuration of browser router to use the `createBrowserRouter` and `createRoutesFromElements` methods from react router DOM
- created a home layout to wrap all child routes
- userContext working on all routes

### March 14th, 2023

- Added pop up menu for homeheader component on mobile view
- Fixed addMaterials page to be responsive down to 320px
- List, Label, Material, and word components all now responsive
- Added error pages with cute anime gif but not fully implemented yet
- `getMaterials` endpoint working
- staggered `info-block` on landing page

## March 15th, 2023

- Ellipsis menu added but only edit button functioning
- Added the update materials route
- Make landing page mobile nav hide when clicked away from

## April 6th, 2023

- Setup d3 and created line chart for known words and added materials

## April 11th, 2023

- Set up highlighting of unknown words on the `viewmaterials` page.

## April 12th, 2023

- Fixed some minor bugs with updating materials and wrapping unknown words in span tags
  - instead of using a regex to strip the html tags away before rendering, I stripped them away and set it as the initial state for the formdata
- Turned the `li` into a `Link` for the Dashboard/Login button on the landing page so the entire area of the button is clickable
- added ellipsis menu to the `viewmaterial` so you can get to the edit page and also delete the material you're viewing
- added search bar on `wordList`

## April 20th, 2023

- fix tooltip popping up in the middle of the screen when a word broke onto a new line

## April 24th, 2023

- Added dictionary page which allows user to search words by pinyin or chinese characters and add any word to their word list
- created `Addwordbutton` component to abstract away all the login that goes into adding a word to the word list so it can be reuse in different pages of the app.

## July 3rd, 2023

- fixed bug with editMaterial page where if the material was submit without changing anything in the body it would just submit a string of "[object]" equal to the number of words in the body of the material.

## July 18th, 2023

- Unable to resolve issues with deploying to vercel and railway. Works perfectly on my machine but once hosted on railway, when I attempt to log in I get an error saying req.user.id on line 10 of controllers/index.js is undefined. I feel like it has something to do with express sessions or connect-mongo adding the user property to the each req object after authentication. But I'm unable to see anything wrong with the way I configured passport, express sessions, or connect-mongo.

## August 2nd, 2023

- finally found a solution to the problem I was dealing with. The express-session cookies wasn't the issue, it was just that render.com for whatever reason doesn't allow cross-domain cookie or even cross-subdomain cookies. The solution was to purchase a custom domain for the app and connect it to render. Also, I registered separate subdomains for the api and Jieba (word segmenter).
  client: www.relingq.com
  Jieba: www.jieba.relingq.com
  API: www.api.relingq.com

- Instead of running my python script inside the node app with the python-shell package, I had to set up a separate web service on render for it. I build a flask app and served it with waitress. In the segmenter middleware on the server, I used axios to make a post request to the flask app with the body of the material and then passed the segmented text along to the route handler.

## September 11th, 2023

- added a profile icon to the landing page but made it hidden on mobile
- changed month format to abbreviated with dayjs
- updated readme with a logo png
- fixed word list items overflowing by adding word-break: break-word to list\_\_item class
- adding footer to landing and home pages.

## September 12th, 2023

- finished adding footer
- Made name in homeHeader dropdown a link to the /home route

## September 16th, 2023

- Added space after semicolon in word definitions on the dictionary page by adding a helper function on the server.

## April ~9th, 2024

- Hosted server on Google app engine. Moved front end and jieba to Vercel.
- Removed stats page from sidebar (might rework it without using D3.js)

## April 14th, 2024

- Started working on adding sorting options on word list and reading list pages
- Moved default sorting of words from get words route by date (most recent first) to server side
  CSS
- made .list-col-label cursor pointer so It will be obvious that its clickable once I finished adding list sorting functionality

# April 16th, 2024

MISC

- Fixed broken image in sidebar mobile screen size
- created tasks.json to automatically open three terminal windows and run all the necessary commands
- added additional cors origin to allowed origin in server.js file
- Sidebar.jsx => changed import of RE.svg to re02.png because RE.svg wasn't loading in chrome

  CSS

- removed overflow: scroll from sidebar scss
- adjusted offset of burger menu on landing page so it doesn't over lap with profile icon
- made profile icon display on mobile screen sizes as well as desktop screen sizes
- attempting to add sorting to word list and material list. Having difficulty with the css and alignment of the titles over the columns

## April 17th, 2024

CSS

- fixed alignment issues with list titles
  - created a aux css class to add and remove to list items when the list is being sort by the specific category

Javascript

- removed ellipse menu unused import from readList.jsx

SORTING LISTS

- abstracted a sortList function into util folder, it takes in listData and sortBy
- changed list component to take nested props of titleId and titleOutput so I have something in the DOM that corresponds with the fields in the database which I can then use as the sortBy value for the sortList function
- set the defaults for the title props to empty objects so react doesn't complain when I don't pass them in

## April 20th, 2024

CLIENT

- Finished adding sorting for all lists in home layout. I used createdContext and useContext hooks to shares a sorting order state variable between all components in the home layout.

- Refactored dashboard data loader function to use Promise.allSettled so word and material data can be fetched from existing endpoint instead from one creating specifically for the Dashboard.

SERVER

- Refactored words and materials endpoints to extract limit query param from URL and pass it the to database query for the dashboard loader function.
- Refactored getWords route to actually limit the results of a request containing a limit query by splitting the wordList array before returning it from the controller

## April 21st, 2024

- Sorting title now change css class to display a different Font awesome Icon when actively being sorted
  - Created a new state to track which was the last clicked title
  - pass a number into the sort function in readingList and wordList and then from there passing it into the list component.

## April 23rd, 2024

- Implemented chart.js / react-chart.js-2 to bring back the statistic page
  - added statistics.scss file just to center the main content of the statistics.jsx file.

## April 25th, 2024

- Abstracted logic out of sortReadingList and sortWordList that set the last clicked title into the sortList util
- Stats page now displays the emptyList component when no chartData is passed into the pieChart ort barChart components

# April 26th, 2024

- AddMaterial page now saves materials that have not been submitted yet in session storage and restores them when returning to the add material page.

# May 8th, 2024

- Redirect for some route wasn't working properly. In the try get for the getWords route, I had to add res.json(false) in the catch so the EnsureAuth component knew to redirect back to the login page.
