//Описание переменных
const uploadFileInput = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const editImageOverlay = document.querySelector('.img-upload__overlay');
const editImageCloseButton = editImageOverlay.querySelector('#upload__cancel');
const getEscapeEvent = window.util.getEscapeEvent;
const body = window.bigPicture.body;

//Функция открытия окна редактирования
const openImageEditOverlay = () => {
  editImageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.addEventListener('click', onImageOverlayClose);
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
  getEscapeEvent(evt, editImageOverlayClose);
}
