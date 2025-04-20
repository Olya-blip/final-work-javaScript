export const initializeMenuToggle = () => {
  const catalogButton = document.querySelector('.header__catalog-btn');
  const mainMenu = document.querySelector('.main-menu');
  const closeButton = document.querySelector('.main-menu__close');

  const openMenu = () => {
    mainMenu.classList.add('main-menu--active');
  };

  const closeMenu = () => {
    mainMenu.classList.remove('main-menu--active');
  };

  catalogButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
};