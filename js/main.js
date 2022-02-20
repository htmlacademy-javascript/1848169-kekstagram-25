//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0) {
    min = min * (-1);
  }
  if(max < 0) {
    max = max * (-1);
  }
  if (max <= min ) {
    max = min;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandom(1, 100);

// Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна
function getLenght(stringChecked, maxLenght) {
  if (stringChecked.length <= maxLenght) {
    return true;
  }
  return false;
}

getLenght('Проверка',12);


