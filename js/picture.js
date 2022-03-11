import {createRandomDescription} from './data.js';

// Находим фрагмент шаблона фотографии

const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getObjectOutput = createRandomDescription();
//Вставим данные в шаблон
getObjectOutput.forEach((elem) => {
  const photoElement = templateFragment.cloneNode(true);
  photoElement.querySelector('picture-img').src = elem.url;
  photoElement.querySelector('picture__likes').textContent = elem.likes;
  photoElement.querySelector('picture__comments').textContent = elem.comments.length;
});

//Cоздаем фрагмент документа
const photoListFragment = document.createDocumentFragment();
//Возвращение шаблону ланных
getObjectOutput.forEach(({url, likes, comments}) => {
  const photoElement = templateFragment.cloneNode(true); //Cклонируем шаблон изображения случайного пользователя
  photoElement.querySelector('picture-img').src = url;
  photoElement.querySelector('picture__likes').textContent = likes;
  photoElement.querySelector('picture__comments').textContent = comments.length;
  return photoListFragment;
});
