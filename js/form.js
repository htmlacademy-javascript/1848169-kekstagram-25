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
  editImageCloseButton.addEventListener('click', editImageOverlayClose);
};

//Обработчик открытия окна редактирования
function onUploadChange () {
  openImageEditOverlay();
}
uploadFileInput.addEventListener('change', onUploadChange);


//Функция закрытия окна редактора
function editImageOverlayClose () {
  editImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  editImageCloseButton.removeEventListener('click', onEditImageOverlayClose);
  document.removeEventListener('keydown', onEditImageOverlayEscPress);
}

//Обработчик закрытия окна редактирования
function onEditImageOverlayClose () {
  editImageOverlayClose();
}

//Функция закрытия окна редактора по ESC
function onEditImageOverlayEscPress (evt) {
  getEscapeEvent(evt, editImageOverlayClose);
}
