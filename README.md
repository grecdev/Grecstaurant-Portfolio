# Grecstaurant

Best food in town, eat a lot and don't get fat.

:computer: Live preview: [in progress]()

### To properly run the website on your local machine:

**Installing:**

1. [Node.js](https://nodejs.org/en/download/)

2. [node package manager](https://docs.npmjs.com/about-npm/), run the following command in the `CLI` (command line interface):
```
npm install -g npm@latest
```
3. Install all `dependencies / modules`, run the following command in the `CLI` (command line interface):
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

1. Smooth Scroll (more on services page)
2. Form regex validation (see on career page, reservation page, checkout page)
3. Home page intro showcase and header animation
4. Scroll Animations
5. Date picker (algorithm source [here](http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html)) adapted to my needs
6. Cart shop (like e-commerce), `CRUD` application, i used `localStorage` for `"mockup database"`
7. Checkout page with slider animation
8. Card Number Format, Card data Format (see on checkout page, the second form) algorithm source [here](https://www.peterbe.com/plog/cc-formatter) adapted to my needs

For the Menu page i used my own [`api`](https://grecdev.github.io/json-api/restaurant-foods.json) with products.

For the Region / Country `select` element, on the Checkout page i used the [`REST Countries`](https://restcountries.eu/) api.



For `api data fetching` i used (see more in `src/assets/js/http.js` file): 

- `XMLHttpRequest()`
- `Fetch api`
- `Async  / await`

### :bowtie: Contribuitors:

Grecu Alexandru aka [`grecdev`]()

### License:

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/grecdev/Grecstaurant/blob/master/LICENSE.md) file for details

***Additional information:***

:iphone: Check for `responsive design` in chrome: 

1. Open `developer console` pressing `F12`
2. Click on the `Toggle Device Toolbar` button or press `Ctrl + Shift + M`

- Optimisez Images
- Basic SEO

You can check for website performance with `google audit` (it checks for individual page):

1. Open `developer console` pressing `F12`
2. Select `Audits` tab
3. Press `Run audits` blue button on the bottom of the tab
