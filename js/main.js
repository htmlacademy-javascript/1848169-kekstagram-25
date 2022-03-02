
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

//Основные параметры расчетных значений
const OBJECT_COUNT = 25;
const minLikes = 15;
const maxLikes = 200;
const minId = 1;
const maxId = 200;
const minAvatar = 1;
const maxAvatar = 6;
//Генерация случайных чисел для программы

//Генерация параметра не повторяющихся чисел
let x;
function getRandomNumber(min, max) {
  const arr = [];
  for (let i = min; i < max; i++) {
    x = getRandom(min, max);
    if (arr.includes(x) === true) {
      i = i - 1;
    } else {
      if (x > max === false) {
        arr.push(x);
      }
    }
  }
  return x;
}

//Функция формирования основного объекта
const createRandomAnnouncement = (_elem, id) => ({
  author: {
    ID: (++id), //идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
    url: `photos/${String(++id).padStart(2, '0')}.jpg`, //строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: 'Описание фотографии',
    likes: getRandomNumber(minLikes, maxLikes), //количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  },
  comments: {
    ID: getRandomNumber(minId, maxId), //id — случайное число. Идентификаторы не должны повторяться.
    avatar: `img/avatar-${getRandomNumber(minAvatar, maxAvatar)}.svg`, //  img/avatar-{{случайное число от 1 до 6}}.svg
    message: COMMENTS[getRandomNumber(0, COMMENTS.length-1)], //одно или два случайных предложения из списка
    name: NAMES[getRandomNumber(0, NAMES.length-1)],
  }
});

const getObjectCount = () =>
  Array.from({
    length: OBJECT_COUNT,
  }, createRandomAnnouncement);
getObjectCount();

