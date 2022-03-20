import {getObjectOutput} from './data.js';
import {createPhotosFragment} from './picture.js';
// import {showBigPhoto} from './big-picture.js';

const photosData = getObjectOutput();
createPhotosFragment(photosData);
// showBigPhoto(photosData);

