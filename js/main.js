
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
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_ID = 1;
const MAX_ID = 200;
const MIN_AVATAR= 1;
const MAX_AVATAR = 6;
const MIN_OBJECT = 1;
const MAX_OBJECT = 3;

//Генерация числа из массива
let RandomNumber;
const getRandomNumber = (min, max) => {
  const arr = [];
  for (let i = min; i < max; i++) {
    RandomNumber = getRandom(min, max);
    if (arr.includes(RandomNumber) === true) {
      i = i - 1;
    } else {
      if (RandomNumber > max === false) {
        arr.push(RandomNumber);
      }
    }
  }
  return RandomNumber;
};

//Функции по созданию случайных чисел по заданным параметрам
const getIdNumber = () => getRandomNumber(MIN_ID, MAX_ID);
const getLikesNumber = () => getRandom(MIN_LIKES,MAX_LIKES);
const getCommentsNumber = () => getRandomNumber(0, COMMENTS.length-1);
const getNamesNumber = () => getRandomNumber(0, NAMES.length-1);
const getAvatarNumber = () => getRandom(MIN_AVATAR, MAX_AVATAR);
const getObjectsNumber = () => getRandomNumber(MIN_OBJECT, MAX_OBJECT);
//Функция создания массива объектов коментариев
const getObjectsArray = () => {
  const ObjectsArray = [];
  for (let i = 1; i <= getObjectsNumber(); i++) {
    const CommentsObject = {
      id: getIdNumber(),
      avatar: `img/avatar-${getAvatarNumber()}.svg`,
      message: COMMENTS[getCommentsNumber()],
      name: NAMES[getNamesNumber()],
    };
    ObjectsArray.push(CommentsObject);
  }
  return ObjectsArray;
};

//Функция формирования объекта описания фото и комментария из массива
const createRandomDescription = (_elem, id) => ({
  author: {
    id: (++id), //идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
    url: `photos/${String(+id)}.jpg`, //строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: 'Фотография, которую давно хотел выложить',
    likes: getLikesNumber(), //количество лайков, поставленных фотографии. Случайное число от 15 до 200.
  },
  comments: getObjectsArray(),
});

//Функция cоздания и вывода массива
const getObjectOutput = () =>
  Array.from({
    length: OBJECT_COUNT,
  }, createRandomDescription);
getObjectOutput();

