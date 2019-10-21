import "../css/style.scss";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Individual functionality for each file
import './global.js';
import './reservation_page/reservation.js';
import './menu_page/menu_selection.js';