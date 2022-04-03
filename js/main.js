import {getObjectOutput} from './data.js';
import {createPhotosFragment} from './picture.js';
import './form.js';
import './scale.js';

const photosData = getObjectOutput();
createPhotosFragment(photosData);


