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
