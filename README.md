# Grecstaurant

Best food in town, eat a lot and don't get fat.

:computer: Live preview: [in progress]()

### To properly run the website on your local machine:

**Installing:**

1. Assuming you have [`git`](https://git-scm.com/downloads) installed type in console: `git clone https://github.com/grecdev/Grecstaurant.git`

2. Make sure you have the latest version of [Node.js](https://nodejs.org/en/download/)

3. [node package manager](https://docs.npmjs.com/about-npm/), run the following command in the `CLI` (command line interface):
```
npm install -g npm@latest
```
4. Install all `dependencies / modules`, run the following command in the `CLI` (command line interface):
```
npm install
```

**To browse the website**:

1. `npm start` - To run development server on your local machine (`localhost`)

2. `npm run build` - To get all production files

### I used the following technologies for this project:

- Semantic HTML5
- [Sass](https://sass-lang.com/) (with `.scss` extension / syntax, see more details [here](https://sass-lang.com/documentation/syntax))
- Media Queries ( Responsive Design )
- Vanilla Javascript
- [Jump.js](http://callmecavs.com/jump.js/) library for smooth scroll
- [Webpack](https://github.com/webpack/webpack)
- For `version control system` i used [Git](https://git-scm.com/)

### Features for this website:

1. Form regex validation
2. Home page intro showcase and header animation
3. Date picker (algorithm source [here](http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html)) adapted to my needs
4. Cart shop (like e-commerce), `CRUD` application, i used `localStorage` for `"mockup database"`
5. Checkout page with form slider animation
6. Card Number Format, Card data Format (see on checkout page, the second form) algorithm source [here](https://www.peterbe.com/plog/cc-formatter) adapted to my needs

For the Menu page i used my own [`api`](https://grecdev.github.io/json-api/restaurant-foods.json) with products.

For the Region / Country `select` element, on the Checkout page i used the [`REST Countries`](https://restcountries.eu/) api.

For `api data fetching` i used (see more in `src/assets/js/http.js` file): 

- `XMLHttpRequest()`
- `Fetch api`
- `Async  / await`

### :bowtie: Contribuitors:

Grecu Alexandru aka [`grecdev`](https://github.com/grecdev)

### License:

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/grecdev/Grecstaurant/blob/master/LICENSE.md) file for details

***Additional information:***

:iphone: Check for `responsive design` in chrome: 

1. Open `developer console` pressing `F12`
2. Click on the `Toggle Device Toolbar` button or press `Ctrl + Shift + M`

(make sure you `refresh` the page each time you change the mobile device)

You can check for website performance with `google audit` (it checks for individual page):

1. Open an `incognito tab`. ( Disables extenstions, and it works better )

- Windows | Linux, | Chrome OS: `Press Ctrl + Shift + n`.
- Mac: `Press ⌘ + Shift + n`.

2. Open `developer console` pressing `F12`
3. Select `Audits` tab
4. Press `Run audits` blue button on the bottom of the tab
