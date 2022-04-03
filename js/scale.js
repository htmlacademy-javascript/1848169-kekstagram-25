// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
// Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+»,
// значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
// При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться
// соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит
// значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).

//Описываем переменные
const minScaleButton = document.querySelector('.scale__control--smaller');
const maxScaleButton = document.querySelector('.scale__control--bigger');
const imageScaleValue = document.querySelector('.scale__control--value');
const editImageOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = editImageOverlay.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

//Преобразование значения масштаба в целое число c указанной системой счисления
const transformValue = () => parseInt(imageScaleValue.value, 10);

//Преобразование масштаба в разметке
const getScaleImage = () => {
  image.style.transform = `scale(${(parseInt(imageScaleValue.value, 10)/100)})`;
};

//Уменьшение масштаба изоабражения
const lowerValueScale = () => {
  let resultValue = transformValue() - SCALE_STEP;
  if (resultValue < MIN_SCALE_VALUE) {
    resultValue = MIN_SCALE_VALUE;
  } else {
    imageScaleValue.value = `${resultValue}%`;
  }
};

//Увеличение масштаба изоабражения
const higherValueScale = () => {
  let resultValue = transformValue() + SCALE_STEP;
  if(resultValue > MAX_SCALE_VALUE) {
    resultValue = MAX_SCALE_VALUE;
  }
  imageScaleValue.value = `${resultValue}%`;
};

//Обработчик нажатия на клавишу 'уменьшение масштаба'
function onClickMinButton () {
  lowerValueScale();
  getScaleImage();
}

//Обработчик нажатия на клавишу 'увеличение масштаба'
function onClickMaxButton () {
  higherValueScale();
  getScaleImage();
}

//Создаем события на кнопку изменения масштаба
minScaleButton.addEventListener('click', onClickMinButton);
maxScaleButton.addEventListener('click', onClickMaxButton);


