import {getObjectOutput} from './data.js';
import {createPhotosFragment} from './picture.js';
import {showBigPictureObject} from './big-picture.js';

const photosData = getObjectOutput();
createPhotosFragment(photosData);
showBigPictureObject(photosData);

