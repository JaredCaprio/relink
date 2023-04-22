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
