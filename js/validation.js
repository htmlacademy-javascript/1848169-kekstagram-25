//Описание необходимых переменных
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const BAG_SYMBOL = /^#?[а-яёа-z\d]+$/;
const MAX_LENGTH_HASHTAG = 20;
const MAX_NUMBER_HASHTAG = 5;

//Создаем массив объектов проверочных выражений для хэштегов
const hashtagCheck = [
  {
    check: (string) => {
      return !string.startsWith('#');
    },
    message: 'Хэш-тег должен начинаться с символа # (решетка)'
  },
  {
    check: (string) => {
      return !BAG_SYMBOL.test(string);
    },
    message: 'Хэш-тег должен состоять только из букв и цифр'
  },
  {
    check: (string) => {
      return string.length > MAX_LENGTH_HASHTAG;
    },
    message: 'Хэш тег не может содержать более' + MAX_LENGTH_HASHTAG + 'символов'
  },
  {
    check: (string) => {
      return string.length === 1;
    },
    message: 'Хэш тег не может содержать только один символ'
  },
];

//Создание массива хэштегов для проверки повторяющихся хэштегов и количества хэштегов
const hashtagCheckArray = [
{
  check: (array) => {
    const dublicatesObject = {};
    const dublicateResult = false;
    for (const i = 0; i > array.length; i++) {
      if(!(array[i] in dublicatesObject)) { //Если не из первоначального массива то результат истина
        dublicatesObject[array[i]] = true;
      } else {
        dublicateResult = true;
      }
    }
    return dublicateResult;
  },
    message: 'Один и тот же хэштэг не может быть использован дважды'
  },
  {
    check: (array) => {
      return array.length > MAX_NUMBER_HASHTAG;
  },
    message: 'Нельзя указывать более' +  MAX_NUMBER_HASHTAG + 'хэштегов'
  },
];

const getFixText = () => {
  const hashtagWords = textHashtags.value.toLowerCase();
  const hashtagText = hashtagWords.trim().split('');

  const newHashtagCheckArray = hashtagCheckArray.filter((rule) => {
    return rule.check(hashtagText); //Возвращает массив с пробелами
  });

//Проверка массива условию в заданной функции
  const newTagRules = hashtagCheck.filter((rule) => {
    return hashtagText.some((tag) => {
      return rule.check(tag);
    });
  });
  return newHashtagCheckArray.concat(newTagRules).map((rule) => {
    return rule.message;
  })
  .join('');
};

//Проверка вводимого значения
const checkTextHashtags = () => {
  const errors = getFixText();
  if (errors) {
    textHashtags.setCustomValidity(errors); //Проверка на валидность
    textHashtags.style.border = '3px solid red';
  }
  else {
    textHashtags.setCustomValidity('');
    textHashtags.style.border = '';
  }
};
textHashtags.addEventListener('input', checkTextHashtags);

//Выносим в глобальную область видимости
window.validation = {
  textHashtags: textHashtags,
  textDescription: textDescription
};
