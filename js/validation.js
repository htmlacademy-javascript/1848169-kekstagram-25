import {getLength} from './util.js';

// Поиск классов для ввода текста и комментариев
const uploadForm = document.querySelector('.img-upload__form');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const commentTextarea = uploadForm.querySelector('.text__description');

//Параметры комментариев
const commentsFeatures = {
  MAX_LENGTH: 140
};

const hashtagsFeatures = {
  MAX_NUMBER: 5,
  MAX: 20,
  REGULAR: /^#[A-Za-za-Яа-яЁё0-9]{1,19}$/
};

//Сообщания об ошибках
const errorMessages = {
  COMMENT_LONG: `Комментарий не может составлять больше ${commentsFeatures.MAX_LENGTH} символов`,
  SPACE_HASHTAGS: 'Хэш-теги должны разделяться пробелами',
  HASH_SYMBOL: 'Хэш-тег должен начинаться с символа # (решётка)',
  TOO_SHORT: 'Хэш-тег не может состоять только из символа # (решётка)',
  HASHTAGS_LONG: `Максимальная длина одно хэш-тега не должна превышать ${hashtagsFeatures.MAX} символов`,
  UNIQUE: 'Хэш-тег не может быть использован дважды',
  OVER_MAX: `Количество хэш-тегов не должно быть больше ${hashtagsFeatures.MAX_NUMBER}`,
  BAG_SYMBOL_MESSAGE: 'Строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и.т.п), символы пунктуации (тире, запятая, и.т.п), эмодзи'
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  succesClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'text'
});

const hashtags = inputHashtags.value.trim().toLowerCase().split(' '); //удаляем пробелы, преобразуем в строчные буквы,

// Обработчик проверки длины строки ввода комментария
const getCommentTextareaInput = (value) => (
  getLength(value, commentsFeatures.MAX_LENGTH)
);
pristine.addValidator(commentTextarea, getCommentTextareaInput, errorMessages.COMMENT_LONG);

// Обработчик проверки длины строки ввода хештега_работает
const getHashtagInput = (value) => (
  getLength(value, hashtagsFeatures.MAX)
);
pristine.addValidator(inputHashtags, getHashtagInput, errorMessages.HASHTAGS_LONG);

//Проверка на наличие ввода первого символа #_работает
const getHashtagSymbolOnly = (value) => (value.startsWith('#'));
pristine.addValidator(inputHashtags, getHashtagSymbolOnly, errorMessages.HASH_SYMBOL);

//Проверка на наличие ввода только символа #_работает
const getHashtagSymbol = (value) => (value === '#');
pristine.addValidator(inputHashtags, getHashtagSymbol, errorMessages.TOO_SHORT);


// Проверка повторного использования хэштэга_не работает
// const getHashtagCopy = (item, index, items) => {
//   const hashtagResult = items.indexOf('item') === index;
//   return (!item.every(hashtagResult));
// };
const getHashtagCopy = () => {
  const arrClone = hashtags.slice(0);
  let duplicateExists = false;
  for (let i = 0; i < hashtags.length; i++) {
    if (!(hashtags[i] in arrClone)) {
      arrClone[hashtags[i]] = true;
    } else {
      duplicateExists = true;
    }
    return duplicateExists;
  }
};
pristine.addValidator(inputHashtags, getHashtagCopy, errorMessages.UNIQUE);

//Проверка количества введенных хештегов_не работает
const getHashtagNumber = (value) => (value.length > hashtagsFeatures.MAX_NUMBER);
pristine.addValidator(inputHashtags, getHashtagNumber, errorMessages.OVER_MAX);

//Проверка ввода недопустимых регулярных символов_не работает
const getHashtagRegular = (value) => (hashtagsFeatures.REGULAR.test(value));
pristine.addValidator(inputHashtags, getHashtagRegular, errorMessages.BAG_SYMBOL_MESSAGE);

//Проверка пробелов между хэштегами_работает
const getHashtagSpace = (value) => (value.split('#').length - 1 > 1);
pristine.addValidator(inputHashtags, getHashtagSpace, errorMessages.SPACE_HASHTAGS);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
