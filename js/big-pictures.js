//Создаем фрагмент
const fragmentDocument = document.createDocumentFragment();
const bigPicture =  document.querySelector('.big-pictures');
const bigPictureImg = document.querySelector('.big-picture__img');
const body = document.querySelector('body');
const socialComment = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
//Создание полноразмерного изображения
const getBigPhotosParameters = (bigPhoto) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = bigPhoto.url;
  document.addEventListener('keydown', onEscPress);
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.url;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  body.classList.add('modal-open');
  socialComment.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  return bigPicture;
};

getBigPhotosParameters();

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
  bigPictureClose.removeEventListener('click', onEscCloseClick);
};

//Обработчик закрытия окна ESC
const onEscCloseClick = () => {
  closeBigPicture();
};
