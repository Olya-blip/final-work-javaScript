export function initCitySelector() {
  const cityButton = document.querySelector('.location__city');
  const cityName = document.querySelector('.location__city-name');
  const sublist = document.querySelector('.location__sublist');

  cityButton.addEventListener('click', function () {
    // Переключаем класс активного состояния
    cityButton.classList.toggle('location__city--active');
  });

  // Обработка клика по элементам списка
  const cityLinks = document.querySelectorAll('.location__sublink');
  cityLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Заменяем текст на выбранный город
      cityName.textContent = this.textContent;
      // Закрываем выпадающее меню
      cityButton.classList.remove('location__city--active');
    });
  });

  // Закрытие меню при повторном нажатии на кнопку
  document.addEventListener('click', function (event) {
    if (!cityButton.contains(event.target) && cityButton.classList.contains('location__city--active')) {
      cityButton.classList.remove('location__city--active');
    }
  });
}