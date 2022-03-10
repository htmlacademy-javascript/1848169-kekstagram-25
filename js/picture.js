import {createRandomDescription} from './picture.js';

// Находим фрагмент шаблона фотографии
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//Функция по загрузке данных в клон шаблона #picture
const getPhotoObject = () => {
  const photo = templateFragment.cloneNode(true);
  const photoSrc = photo.querySelector('picture-img');
  const photoComments = photo.querySelector('picture__comments');
  const photoLikes = photo.querySelector('picture__likes');

  photoSrc.src = createRandomDescription.url;
  photoComments.textContent = createRandomDescription.comments;
  photoLikes.textContent = createRandomDescription.likes;

  return photo;
};
getPhotoObject();
