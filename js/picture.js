import {showBigPhoto} from './big-pictures.js';

// Описание переменных
const templateFragmentNode = document.querySelector('#picture').content.querySelector('.picture');
const fragmentNode = document.createDocumentFragment();
const photosBlockNode = document.querySelector('.pictures');

// Заполнение шаблона документа
const getPhotoItem = (photoObject) => {
  const photoItemNode = templateFragmentNode.cloneNode(true);
  photoItemNode.querySelector('.picture__img').src = photoObject.url;
  photoItemNode.querySelector('.picture__likes').textContent = photoObject.likes;
  photoItemNode.querySelector('.picture__comments').textContent = photoObject.comments.length;
  photoItemNode.addEventListener('click', () => {
    showBigPhoto(photoObject);
  });
  return photoItemNode;
};

// Создание вставки шаблона в фрагмент документа
const createPhotosFragment = (photos) => {
  photos.forEach((photo)=> {
    const photoElement = getPhotoItem(photo);
    fragmentNode.appendChild(photoElement);
  });
  photosBlockNode.appendChild(fragmentNode);
};

export {createPhotosFragment};
