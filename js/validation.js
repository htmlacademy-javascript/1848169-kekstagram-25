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
  REGULAR: /^#?а-яёа-zd]+$/
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
  BAG_SYMBOL_MESSAGE: 'Строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и.т.п), символы пунктуации (тиреЮ запятая, и.т.п), эмодзи'
};

const pristine = new Pristine(uploadForm, {
  classTextarea: 'commentTextarea',
  classHashtags: 'inputHashtags'
});

//Обработчик проверки длины строки ввода комментария
const getCommentTextareaInput = (value) => (
  getLength(value, commentsFeatures.MAX_LENGTH)
);
pristine.addValidator(commentTextarea, getCommentTextareaInput, errorMessages.COMMENT_LONG);

const hashtags = inputHashtags.value.trim().toLowerCase().split(' ');

//Обработчик проверки длины строки ввода хештега
const getHashtagInput = (value) => (
  getLength(value, hashtagsFeatures.MAX)
);
pristine.addValidator(inputHashtags, getHashtagInput, errorMessages.HASHTAGS_LONG);

//Проверка повторного использования хэштэга
const getHashtagCopy = (item, index, items) => {
  const hashtagResult = items.indexOf(item) === index;
  return (!hashtags.every(hashtagResult));
};
pristine.addValidator(inputHashtags, getHashtagCopy, errorMessages.UNIQUE);

//Проверка количества введенных хештегов
const getHashtagNumber = () => hashtags.length > hashtagsFeatures.MAX_NUMBER;
pristine.addValidator(inputHashtags, getHashtagNumber, errorMessages.OVER_MAX);

//Проверка ввода недопустимых регулярных символов
const getHashtagRegular = () => (hashtagsFeatures.REGULAR.test(hashtags));
pristine.addValidator(inputHashtags, getHashtagRegular, errorMessages.BAG_SYMBOL_MESSAGE);

//Проверка на наличие ввода только символа #
const getHashtagSymbol = () => (hashtags === '#');
pristine.addValidator(inputHashtags, getHashtagSymbol, errorMessages.TOO_SHORT);

//Проверка на наличие ввода первого символа #
const getHashtagSymbolOnly = () => (hashtags.charAt(0) !== '#');
pristine.addValidator(inputHashtags, getHashtagSymbolOnly, errorMessages.HASH_SYMBOL);

//Проверка пробелов между хэштегами
const getHashtagSpace = () => (hashtags.split('#').length - 1 > 1);
pristine.addValidator(inputHashtags, getHashtagSpace, errorMessages.SPACE_HASHTAGS);

//Обработчик проверки при отправке сообщения
inputHashtags.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

commentTextarea.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
