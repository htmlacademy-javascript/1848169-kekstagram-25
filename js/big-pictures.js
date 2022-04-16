import {getEscapeEvent} from './util.js';

// Описание переменных
const MAX_COMMENT = 5;
const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = document.querySelector('.big-picture__img');
const socialCommentCountNode = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const commentsListNode = document.querySelector('.social__comments');
const commentElementNode = commentsListNode.querySelector('.social__comment');
const commentsLoaderNode = document.querySelector('.comments-loader');
const bigPictureCloseNode = bigPictureNode.querySelector('.big-picture__cancel');
let commentsArrayData = [];
let commentsCounter = 5;

// Отрисовка одного комментария
const getBigPictureComment = (comment) => {
  const commentItem = commentElementNode.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
};

// Создание фрагмента комментария
const createCommentsFragment = (commentsArray) => {
  const fragment = document.createDocumentFragment();
  commentsArray.forEach((comment) => {
    const patternComment = getBigPictureComment(comment);
    fragment.appendChild(patternComment);
  });
  commentsListNode.appendChild(fragment);
};

// Создание полноразмерного изображения
const showBigPhoto = (bigPhoto) => {
  body.classList.add('modal-open');
  commentsListNode.innerHTML = '';
  bigPictureImgNode.querySelector('img').src = bigPhoto.url;
  bigPictureNode.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPictureNode.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPictureNode.querySelector('.social__caption').textContent = bigPhoto.description;
  bigPictureNode.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureCloseNode.addEventListener('click', onBigPictureCloseClick);
  socialCommentCountNode.firstChild.textContent = `${MAX_COMMENT} из `;
  commentsArrayData = bigPhoto.comments.slice();
  if (commentsArrayData.length <= MAX_COMMENT) {
    socialCommentCountNode.firstChild.textContent = `${bigPhoto.comments.length} из `;
    createCommentsFragment(commentsArrayData);
    commentsLoaderNode.classList.add('hidden');
  }
  if (commentsArrayData.length >= MAX_COMMENT) {
    createCommentsFragment(commentsArrayData.slice(0, MAX_COMMENT));
    commentsLoaderNode.classList.remove('hidden');
    commentsLoaderNode.addEventListener('click', onCommentsLoaderClick);
  }
};

// Проверка текущего числа комментариев
const getCurentCommentCount = (comments) => comments ? comments.children.length: 0;

// Обработчик загрузки комментариев
function onCommentsLoaderClick () {
  createCommentsFragment(commentsArrayData.slice(commentsCounter, commentsCounter += MAX_COMMENT));
  if (commentsCounter >= commentsArrayData.length) {
    commentsLoaderNode.classList.add('hidden');
    commentsLoaderNode.removeEventListener('click', onCommentsLoaderClick);
    commentsCounter = MAX_COMMENT;
  }
  socialCommentCountNode.firstChild.textContent = `${getCurentCommentCount(commentsListNode)} из `;
  if (commentsArrayData.length === 0) {
    commentsLoaderNode.classList.add('hidden');
    commentsLoaderNode.removeEventListener('click', onCommentsLoaderClick);
  }
}

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
  bigPictureCloseNode.removeEventListener('click', onBigPictureCloseClick);
};

// Функция закрытия окна полноразмерного изображения по Escape
function onBigPictureEscPress (evt) {
  getEscapeEvent(evt, closeBigPicture);
}

// Обработчик закрытия окна кликом по иконке закрытия
function onBigPictureCloseClick () {
  closeBigPicture();
}

export {showBigPhoto};
