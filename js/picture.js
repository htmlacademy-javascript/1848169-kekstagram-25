const COUNT_PHOTOS = 10;
// Находим фрагмент шаблона фотографии
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Создаем фрагмент
const fragment = document.createDocumentFragment();
const photosBlock = document.querySelector('.pictures');

// Заполнение шаблона документа
const getPhotoItem = (photoObject) => {
  const photoItem = templateFragment.cloneNode(true);
  photoItem.querySelector('picture__img').src = photoObject.url;
  photoItem.querySelector('picture__likes').textContent = photoObject.likes;
  photoItem.querySelector('picture__comments').textContent = photoObject.comments.length;
  return photoItem;
};

//Создание заполненного шаблона в фрагмент документа
const createPhotosFragment = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const photoElement = getPhotoItem(photos[i]);
    fragment.appendChild(photoElement);
  }
  photosBlock.appendChild(fragment);
};

//Функция cоздания массива фотографий
const getArrayPhoto = () => {
  Array.from({length:  COUNT_PHOTOS,
  }, getPhotoItem);
  createPhotosFragment(getArrayPhoto);
  return getArrayPhoto;
};

export {createPhotosFragment};
export {getArrayPhoto};
