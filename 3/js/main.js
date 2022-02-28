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

// Создадим массив comments - список комментариев
const getRandomAvatar = (elements) => elements[getRandom(1, 6)];
const getRandomMessage = (message) => message[getRandom(0, COMMENTS.length - 1)];
const getRandomNames = (names) => names[getRandom(0, NAMES.length - 1)];
const getRandomIde = (ide) => ide[getRandom(1, 50)];


const createMessage = () => {
   return {
    id: getRandomIde,
    avatar: 'img/avatar-' + getRandomAvatar + '.svg',
    message: getRandomMessage(COMMENTS),
    name: getRandomNames(NAMES),
  };
};

const commentsArray = Array.from({length: 6}, createMessage);
createMessage();
commentsArray();

// Создание массива из 25 сгенерированных объектов
const getRandomId = (idNumber) => idNumber[getRandom(1, 25)];
const getRandomUrl = (urlnumber) => urlnumber[getRandom(1, 25)];
const getRandomLikes = (likesnumber) => likesnumber[getRandom(15, 200)];
const createObject = () => {
  return {
    id: getRandomId,
    url: 'photos/' + getRandomUrl + '.jpg',
    description: 'Фото пользователя',
    likes: likesnumber,
    comments: createMessage(),
  };
};
const photoArray = Array.from({length: 25}, createObject);
photoArray();
createObject();
