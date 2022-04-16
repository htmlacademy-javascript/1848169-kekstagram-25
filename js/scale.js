//Описываем переменные
const minScaleButtonNode = document.querySelector('.scale__control--smaller');
const maxScaleButtonNode = document.querySelector('.scale__control--bigger');
const imageScaleValueNode = document.querySelector('.scale__control--value');
const editImageOverlayNode = document.querySelector('.img-upload__overlay');
const imagePreviewNode = editImageOverlayNode.querySelector('.img-upload__preview');
const imageNode = imagePreviewNode.querySelector('img');
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

// Установка значения масштаба по умолчанию на 100%
imageScaleValueNode.value = `${DEFAULT_SCALE_VALUE}%`;

// Преобразование значения масштаба в целое число c указанной системой счисления
const getTransformValue = () => parseInt(imageScaleValueNode.value, 10);

// Преобразование масштаба в разметке
const getScaleImageTransform = () => {
  imageNode.style.transform = `scale(${(parseInt(imageScaleValueNode.value, 10)/100)})`;
};

// Уменьшение масштаба изоабражения
const getLowerValueScale = () => {
  let resultValue = getTransformValue() - SCALE_STEP;
  if (resultValue < MIN_SCALE_VALUE) {
    resultValue = MIN_SCALE_VALUE;
  }
  imageScaleValueNode.value = `${resultValue}%`;
};

//Увеличение масштаба изоабражения
const getHigherValueScale = () => {
  let resultValue = getTransformValue() + SCALE_STEP;
  if (resultValue > MAX_SCALE_VALUE) {
    resultValue = MAX_SCALE_VALUE;
  }
  imageScaleValueNode.value = `${resultValue}%`;
};

//Обработчик нажатия на клавишу 'уменьшение масштаба'
function onMinButtonClick () {
  getLowerValueScale();
  getScaleImageTransform();
}

//Обработчик нажатия на клавишу 'увеличение масштаба'
function onMaxButtonClick() {
  getHigherValueScale();
  getScaleImageTransform();
}

//Создаем события на кнопки изменения масштаба
minScaleButtonNode.addEventListener('click', onMinButtonClick);
maxScaleButtonNode.addEventListener('click', onMaxButtonClick);

export {getScaleImageTransform};


