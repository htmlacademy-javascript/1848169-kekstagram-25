// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри
// .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению
// нужно добавить класс effects__preview--chrome.
// 2.2. Наложение эффекта на изображение:

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.

// Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой
// для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня
// интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются
// следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер скрывается.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер,
// CSS-стиль изображения и значение поля должны обновляться
//Объекты выбранных фильтров
//Описание переменных
const imagePreview = document.querySelector('.img-upload__preview');
// const effectsButton = document.querySelector('.effects__radio');
// const effectField = document.querySelector('.effects');
const image = imagePreview.querySelector('img');
const sliderElement = document.querySelector('.effect-level__slider');
// const valueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effects = {
  none:'',
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  }
};

// Cлайдер регулирования эффектов
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
  }
});
let effect;

// Событие клика на радиокнопку, выбор эффекта
effectsList.addEventListener('click', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    effect = evt.target.value;
    sliderElement.noUiSlider.updateOptions(effects[effect]);
    image.classList = '';
    if (effect === 'none') {
      const currentEffect = image.className;
      image.classList.remove(currentEffect);
    } else {
      image.classList.add(`effects__preview--${effect}`);
    }
  }
});

// Метод .format.to() нужен для форматирования значения из слайдера и вывода его где-либо.
// Метод .format.from() нужен для форматирования значения для слайдера. Этот метод должен строго возвращать
// число, поэтому используем parseFloat(), и достаточно.


//Удаление слайдера
// var hideSlider = function () {
//   slider.classList.add('hidden');
// };

// sliderElement.setAttribute('disabled', true);

// sliderElement.removeAttribute('disabled');
