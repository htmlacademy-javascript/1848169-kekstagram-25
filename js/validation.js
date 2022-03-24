// Поиск классов для ввода текста и комментариев
const inputHashtags = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

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

//Обработчик текста ввода комментария
const onCommentTextareaInput = () => {
  const text = commentTextarea.value;
  if (!text.length) {
    return;
  }
  if (text.length > commentsFeatures.MAX_LENGTH) {
    commentTextarea.setCustomValidity(errorMessages.COMMENT_LONG);
  }
};
// Выделение поля ввода
const lightInput = (input) => {
  input.style.border = '3px solid green';
  input.style.boxShadow = 'none';
};

// Убираем подсветку инпута
const resetlightInput = (input) => {
  input.style.border = '';
};

//Проверка повторного использования хэштэга
const isHashtagAgain = (item, index, items) => items.indexOf(item) === index;

// Обработчик ввода хэштегов
const onInputHashtags = () => {
  resetlightInput(inputHashtags);
  const hashtags = inputHashtags.value.trim().toLowerCase().split(' ');

  if (!hashtags.length) {
    return;
  }

  if (hashtags.length > hashtagsFeatures.MAX_NUMBER) {
    lightInput(inputHashtags);
    inputHashtags.setCustomValidity(errorMessages.OVER_MAX);
    return;
  }

  if (!hashtags.every(isHashtagAgain)) {
    lightInput(inputHashtags);
    inputHashtags.setCustomValidity(errorMessages.UNIQUE);
    return;
  }

  hashtags.forEach((hashtag) => {
    if (hashtag.length > hashtagsFeatures.MAX) {
      lightInput(inputHashtags);
      inputHashtags.setCustomValidity(errorMessages.HASHTAGS_LONG);
    } else if (/^#?а-яёа-zd]+$/.test(hashtag)) {
      inputHashtags.setCustomValidity(errorMessages.BAG_SYMBOL_MESSAGE);
    } else if (hashtag === '#') {
      lightInput(inputHashtags);
      inputHashtags.setCustomValidity(errorMessages.TOO_SHORT);
    } else if (hashtag.charAt(0) !== '#') {
      lightInput(inputHashtags);
      inputHashtags.setCustomValidity(errorMessages.HASH_SYMBOL);
    } else if (hashtag.includes('#', 1)) {
      lightInput(inputHashtags);
      inputHashtags.setCustomValidity(errorMessages.SPACE_DELIMITER);
    } else {
      resetlightInput(inputHashtags);
      inputHashtags.setCustomValidity('');
    }
  });
};

// Подключаем обработчик события на форму
const activateForm = () => {
  inputHashtags.addEventListener('input', onInputHashtags);
  commentTextarea.addEventListener('input', onCommentTextareaInput);
};

// Отключаем обработчик события с формы
const disableForm = () => {
  inputHashtags.removeEventListener('input', onInputHashtags);
  commentTextarea.removeEventListener('input', onCommentTextareaInput);
};

// Передаём функции в глобальную область видимости
window.validation = {
  activateForm: activateForm,
  disableForm: disableForm
};
