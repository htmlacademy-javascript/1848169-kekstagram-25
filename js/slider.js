// 2.2. Наложение эффекта на изображение:

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри
// .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению
// нужно добавить класс effects__preview--chrome.
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

//Будем использовать стороннюю библиотеку Unislider

//Описываем переменные

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
// const imagePreview = document.querySelector('.img-upload__preview');
// const effectsButton = document.querySelector('.effects__radio');
// const effectsValue = document.querySelector('.effect-level__value');

// global noUiSlider:readonly
// Добавим слайдеру слушатель события update, которое будет вызвано при изменении положения слайдера,
// и выводить в консоль параметры колбэка.
// Если положение слайдера изменилось, нужно изменить и значение в поле ввода.
// Получим актуальное значение слайдера с помощью метода .get() и запишем его в свойство value поля ввода.
// sliderElement.noUiSlider.on('update', () => {
//   valueElement.value = sliderElement.noUiSlider.get();
// });
//Передаем noSlider элемент в который просим отрисовать слайдер, а также минимальное и максимальное значение и шаг.
valueElement.value = 100;
// Метод .format.to() нужен для форматирования значения из слайдера и вывода его где-либо.
// Метод .format.from() нужен для форматирования значения для слайдера. Этот метод должен строго возвращать
// число, поэтому используем parseFloat(), и достаточно.
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// sliderElement.setAttribute('disabled', true);

// sliderElement.removeAttribute('disabled');
//Пропишем условия работы слайдера в зависимости от изменения параметров_нажатии кнопок
