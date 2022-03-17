//Описание переменных
const bigPicture =  document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCommentCount = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const commentsList = document.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const ESC = 'Escape';

// Отрисовка одного комментария
const bigPictureComment = (comment) => {
  const commentItem = commentElement.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
};
bigPictureComment();

//Создание полноразмерного изображения
const createBigPhotos = (bigPhoto) => {
  bigPicture.classList.remove('.hidden');
  bigPictureImg.src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  document.addEventListener('keydown', onEscPress);
  body.classList.add('.modal-open');
  socialCommentCount.classList.add('.hidden');
  commentsLoader.classList.add('.hidden');
  return bigPicture;
};
createBigPhotos();

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('.hidden');
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onEscPress);
  bigPictureClose.removeEventListener('click', onEscCloseClick);
};

// Функция закрытия окна полноразмерного изображения по Escape
function onEscPress (evt) {
  getEscapeEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна кликом по иконке закрытия
function onEscCloseClick () {
  closeBigPicture();
}

// Функция закрытия окна по Escape
function getEscapeEvent (evt, action) {
  if (evt.key === ESC) {
    action();
  }
}
