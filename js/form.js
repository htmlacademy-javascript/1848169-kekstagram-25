import {getEscapeEvent} from './util.js';
import {getScaleImageTransform} from './scale.js';

//Описание переменных
const body = document.body;
const uploadFileInput = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const editImageOverlay = document.querySelector('.img-upload__overlay');
const editImageCloseButton = editImageOverlay.querySelector('.img-upload__cancel');
const inputHashtags = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');
const imageScaleValue = document.querySelector('.scale__control--value');
const DEFAULT_SCALE_VALUE = 100;
const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const sliderBlock = document.querySelector('.effect-level');

//Функция открытия окна редактирования
const openImageEditOverlay = () => {
  body.classList.add('modal-open');
  editImageOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.addEventListener('click', onImageOverlayClose);
  imageScaleValue.value = `${DEFAULT_SCALE_VALUE}%`;
  getScaleImageTransform();
  image.style.filter = '';
  sliderBlock.classList.add('hidden');
};

//Обработчик открытия окна редактирования
function onUploadChange () {
  openImageEditOverlay();
}
uploadFileInput.addEventListener('change', onUploadChange);

//Функция закрытия окна редактора
const editImageOverlayClose = () => {
  editImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  document.removeEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.removeEventListener('click', onImageOverlayClose);
};

//Обработчик закрытия окна редактирования
function onImageOverlayClose () {
  editImageOverlayClose();
}

//Функция закрытия окна редактора по ESC
function onImageOverlayEscPress (evt) {
  const active = document.activeElement;
  if (inputHashtags !== active && commentTextarea !== active) {
    getEscapeEvent(evt, editImageOverlayClose);
  }
}

export {onImageOverlayClose, editImageOverlayClose};
