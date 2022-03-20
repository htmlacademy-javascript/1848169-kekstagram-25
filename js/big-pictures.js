import {getEscapeEvent} from './util.js';

//Описание переменных
const bigPicture =  document.querySelector('.big-picture');
// const pictureImg = document.querySelectorAll('.picture__img');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCommentCount = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const commentsList = document.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

// Отрисовка одного комментария
const getBigPictureComment = (comment) => {
  const commentItem = commentElement.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
};

//Создание фрагмента комментария
const createCommentsFragment = (commentsArray) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsArray.length; i++) {
    const commentElementArray = getBigPictureComment(commentsArray[i]);
    fragment.appendChild(commentElementArray);
  }
  commentsList.appendChild(fragment);
};
createCommentsFragment();

//Создание полноразмерного изображения
const showBigPhoto = (bigPhoto) => {
  bigPictureImg.querySelector('img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
};
//Обработчик клика по фотографии
// const onBigPictureOpenClick = (thumbnail, photo) => {
//   thumbnail.addEventListener('click', () => {
//     bigPictureImg.querySelector('img').src = photo;
//   });
//   document.addEventListener('keydown', onBigPictureEscPress);
//   bigPictureClose.addEventListener('click', onBigPictureCloseClick);
// };
// for (let i = 0; i < pictureImg.length; i++) {

//   onBigPictureOpenClick(pictureImg[i], photos[i]);
// }
// onBigPictureOpenClick();

//Вывод полноразмерного изображения
const showBigPictureObject = (pictureObject) => {
  showBigPhoto(pictureObject);
};

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
};

// Функция закрытия окна полноразмерного изображения по Escape
function onBigPictureEscPress (evt) {
  getEscapeEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна кликом по иконке закрытия
function onBigPictureCloseClick () {
  closeBigPicture();
}

export {showBigPhoto, showBigPictureObject};
