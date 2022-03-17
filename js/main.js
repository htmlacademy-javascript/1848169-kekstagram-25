import {getObjectOutput} from './data.js';
import {createPhotosFragment} from './picture.js';
// import './big-picture.js';

const photosData = getObjectOutput();
createPhotosFragment(photosData);
