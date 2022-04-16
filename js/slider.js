// Описание переменных для реализации слайдера
const imagePreviewNode = document.querySelector('.img-upload__preview');
const imageNode = imagePreviewNode.querySelector('img');
const sliderElementNode = document.querySelector('.effect-level__slider');
const valueElementNode = document.querySelector('.effect-level__value');
const effectsListNode = document.querySelector('.effects__list');
const sliderBlockNode = document.querySelector('.effect-level');

// Создание объекта дяннах с парамтерами эффектов
const Effects = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'none',
    unit: ''
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'brightness',
    unit: '',
  },
};

// Создание слайдера регулировки эффектов
noUiSlider.create(sliderElementNode, {
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

// Создаем событие клика на радиокнопку и выбор эффекта
let effectFilter;
sliderBlockNode.classList.add('hidden');
effectsListNode.addEventListener('click', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const effect = evt.target.value;
    effectFilter = Effects[effect];
    sliderElementNode.noUiSlider.updateOptions(effectFilter);
    if (effect === 'none') {
      imageNode.style.filter = '';
      sliderBlockNode.classList.add('hidden');
    } else {
      sliderBlockNode.classList.remove('hidden');
    }
    sliderElementNode.noUiSlider.on('update', () => {
      valueElementNode.value = sliderElementNode.noUiSlider.get();
      imageNode.style.filter = `${effectFilter.filter}(${valueElementNode.value}${effectFilter.unit})`;
    });
  }
});
