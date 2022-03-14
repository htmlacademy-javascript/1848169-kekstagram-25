// Находим фрагмент шаблона фотографии
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Создаем фрагмент
const fragment = document.createDocumentFragment();
const photosBlock = document.querySelector('.pictures');

// Заполнение шаблона документа
const getPhotosParametres = (photoObject) => {
  const photoItem = templateFragment.cloneNode(true);
  photoItem.querySelector('picture-img').src = photoObject.url;
  photoItem.querySelector('picture__likes').textContent = photoObject.likes;
  photoItem.querySelector('picture__comments').textContent = photoObject.comments.length;
  return photoItem;
};
//Создание заполненного шаблона в фрагмент документа
const createPhotosFragment = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const photoElement = getPhotosParametres(photos[i]);
    fragment.appendChild(photoElement);
  }
  photosBlock.appendChild(fragment);
};
export {createPhotosFragment};
