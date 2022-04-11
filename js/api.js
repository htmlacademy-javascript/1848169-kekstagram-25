import {showAlert} from './util.js';
import {getEscapeEvent} from './util.js';

//Описание переменных
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const main = document.querySelector('main');

// Создаем фрагмент сообщения об успешной отправке
const createStatusMessage = (template) => {
  const statusMessage = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(statusMessage);
  main.appendChild(fragment);
};

//Создание сообщения об успешной отправке формы
const createSuccessMessage = () => {
  createStatusMessage(successTemplate);
};

//Закрытие сообщения об успешной отправке
const closeSuccessMessage = () => {
  const successOverlay = document.querySelector('.success');
  const successMessageButton = document.querySelector('.success__button');
  successMessageButton.removeEventListener('click', onSuccessMessageCloseClick);
  document.removeEventListener('keydown', onSuccessMessageEscPress);
  main.removeChild(successOverlay);
};

//Обработчик закрытия сообщения об успешной отправке
function onSuccessMessageCloseClick () {
  closeSuccessMessage();
}

//Разблокировка кнопки после отправки
const unblockSubmitButton = () => {
  const uploadFormButton = document.querySelector('.img-upload__submit');
  uploadFormButton.disabled = false;
  uploadFormButton.textContent = 'Опубликовать';
};

//Обработчик закрытия успешной отправки формы
const onSuccessCloseForm = () => {
  createSuccessMessage();
  const successOverlay = document.querySelector('.success');
  const successMessageButton = document.querySelector('.success__button');
  document.addEventListener('keydown', onSuccessMessageEscPress);
  successMessageButton.addEventListener('click', onSuccessMessageCloseClick);
  const successField = document.querySelector('.success__inner');
  unblockSubmitButton();
  successOverlay.addEventListener('click', (evt) => {
    if (evt.target !== successField) {
      closeSuccessMessage();
    }
  });
};

//Блокировка кнопки во время отправки
const blockSubmitButton = () => {
  const uploadFormButton = document.querySelector('.img-upload__submit');
  uploadFormButton.disabled = true;
  uploadFormButton.textContent = 'Сохраняю...';
};

// Обработчик закрытия сообщения об успехе по Escape
function onSuccessMessageEscPress (evt) {
  getEscapeEvent(evt, closeSuccessMessage);
}

// Создание сообщения об ошибке при отправке формы
const createErrorMessage = () => {
  createStatusMessage(errorTemplate);
};

//Закрытие сообщения об ошибки при отправке
const closeErrorMessage = () => {
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorOverlay.querySelector('.error__button');
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  document.removeEventListener('keydown', onErrorMessageEscPress);
  main.removeChild(errorOverlay);
};

// Обработчик закрытия сообщения об ошибке
function onErrorMessageCloseClick () {
  closeErrorMessage();
}

// Обработчик закрытия сообщения об ошибке по Escape
function onErrorMessageEscPress (evt) {
  getEscapeEvent(evt, closeErrorMessage);
}

// Обработчик закрытия сообщения об ошибке при отправке
const onErrorCloseForm = () => {
  createErrorMessage();
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorOverlay.querySelector('.error__button');
  document.addEventListener('keydown', onErrorMessageEscPress);
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  const errorField = document.querySelector('.error__inner');
  errorOverlay.addEventListener('click', (evt) => {
    if (evt.target !== errorField) {
      closeErrorMessage();
    }
  });
};

//Отправляем запрос на сервер
const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Ошибка загрузки данных с сервера : - (');
    });
};

//Отправляем данные на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess(true);
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData, onSuccessCloseForm, onErrorCloseForm, blockSubmitButton, unblockSubmitButton};
