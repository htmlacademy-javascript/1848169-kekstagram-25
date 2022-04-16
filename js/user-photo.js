// Описание переменных
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const editImageOverlayNode = document.querySelector('.img-upload__overlay');
const imagePreviewNode = editImageOverlayNode.querySelector('.img-upload__preview');
const imageNode = imagePreviewNode.querySelector('img');
const fileChooserNode = document.querySelector('.img-upload__input');

// Выбор фотографии пользователя
fileChooserNode.addEventListener('change', () => {
  const file = fileChooserNode.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imageNode.src = URL.createObjectURL(file);
  }
});
