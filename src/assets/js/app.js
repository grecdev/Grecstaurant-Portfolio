import "../css/style.scss";

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Individual functionality for each file
import { globalFunctionality } from './global.js';

globalFunctionality.init();