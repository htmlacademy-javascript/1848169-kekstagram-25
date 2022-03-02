/* eslint-disable no-shadow */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0) {
    min = Math.abs(min);
  }
  if(max < 0) {
    max = Math.abs(max);
  }
  if (max <= min ) {
    max = min;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandom(1, 5);

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
const getLength = (stringChecked, maxLength) => stringChecked.length <= maxLength;

getLength('Проверка', 24);

//Создаем массив комментариев

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

//Создаем массив имен
const NAMES = [
  'Антон',
  'Мария',
  'Сергей',
  'Рустем',
  'Василиса',
  'Владимир',
  'Мария',
  'Святослав',
];

// Функция генерации сообщений

const createMessage = () => {
//Генерация неповторяющегося ID от 1 до 25
  const getRandomId = () => getRandom(1, 25);
  const RandomIdArray = Array.from({ length: 25 }, getRandomId); //Генератор ID 1..25 c повторениями
  const RandomIdSet = [...new Set(RandomIdArray)]; //Генератор ID 1..25 без повторений
  const getIdNumber = () => {
    for (let i = 1; i <= RandomIdSet.length; i++) {
      return RandomIdSet[i];
    }
  };
  //Генерация неповторяющегося номера аватара от 1 до 6
  const getRandomAvatar = () => getRandom(1, 6);
  const RandomAvatarArray = Array.from({ length: 6 }, getRandomAvatar);
  const RandomAvatar = [...new Set(RandomAvatarArray)];
  const getAvatarNumber = () => {
    for (let i = 1; i <= RandomAvatar.length; i++) {
      return RandomAvatar[i];
    }
  };
  //Генерация неповторяющегося комментария из массива COMENTS
  const getRandomComments = () => getRandom(1, COMMENTS.length - 1);
  const RandomCommentsArray = Array.from({ length: COMMENTS.length - 1}, getRandomComments);
  const RandomComments = [...new Set(RandomCommentsArray)];
  const getComentsNumber = () => {
    for (let i = 1; i <= RandomComments.length; i++) {
      return RandomComments[i];
    }
  };
  //Генерация неповторяющегося имени из массива NAME

  const getRandomNames = () => getRandom(1, NAMES.length - 1);
  const RandomNamesArray = Array.from({ length: NAMES.length - 1}, getRandomNames);
  const RandomNames = [...new Set(RandomNamesArray)];
  const getNamesNumber = () => {
    for (let i = 1; i <= NAMES.length - 1; i++) {
      return RandomNames[i];
    }
  };
  return {
    id: getIdNumber(),
    avatar: `img/avatar-${getAvatarNumber()}.svg`,
    message: COMMENTS[getComentsNumber()],
    name: NAMES[getNamesNumber()],
  };
};

//Создание массива объектов комментариев, т.к. комментариев
const getArrayComments = () => {
  // const randomComments = getRandom(1, COMMENTS.length);
  const commentsArray = Array.from({ length: 2 }, createMessage);
  return commentsArray;
};
// Создание массива из 25 сгенерированных объектов

function createObject() {
  //Генерация неповторяющегося ID от 1 до 25
  const getRandomIde = () => getRandom(1, 25);
  const RandomIdeArray = Array.from({ length: 25}, getRandomIde);
  const RandomIde = [...new Set(RandomIdeArray)];
  const getIdeNumber = () => {
    for (let i = 1; i <= RandomIde.length; i++) {
      return RandomIde[i];
    }
  };
  //Генерация URL от 1 до 25
  const getRandomUrl = () => getRandom(1, 25);
  const RandomUrlArray = Array.from({ length: 25}, getRandomUrl);
  const RandomUrl = [...new Set(RandomUrlArray)];
  const getUrlNumber = () => {
    for (let i = 1; i <= RandomUrl.length; i++) {
      return RandomUrl[i];
    }
  };
  //Генерация likes от 15 до 200
  const getRandomLikes = () => getRandom(15, 200);
  const RandomLikesArray = Array.from({ length: 185}, getRandomLikes);
  const RandomLikes = [...new Set(RandomLikesArray)];
  const getLikesNumber = () => {
    for (let i = 1; i <= RandomLikes.length; i++) {
      return RandomLikes[i];
    }
  };
  return {
    id: getRandomIde(),
    url: `photos/${getRandomUrl()}.jpg`,
    description: 'Фото пользователя',
    likes: getRandomLikes(),
    comments: getArrayComments(),
  };
}

const photoArray = Array.from({length: 25}, createObject); //Массив из 25 объектов
createObject();

function createObjectArray() { //Функция создания 25 объектов
  return photoArray;
}


