import { initializeMenuToggle } from './components/burger.js'; // бургерное меню
import { initCitySelector } from './components/location.js'; // выбор города
import { initProducts } from './components/createProduct.js'; // отрисовка карточек
import { initAccordion } from './components/accordion.js'; //аккордион
import { updateCounts } from './components/updateCounts.js'; // Количество товаров в соответствующей категории рядом с каждым фильтром
import { sortProducts, initSorting } from './components/sortProducts.js'; //сортировка по цене
import {initSlider} from './components/slider.js';//слайдер
import {initFormValidation} from './components/validation.js'//валидация
import {initFormHandler} from './components/modal.js';
import {initEventListeners} from './components/filterProducts.js';
import {loadProducts} from './components/fetch.js';

window.addEventListener('DOMContentLoaded',async () => {
    const products = await loadProducts();
    initProducts(products);
    initializeMenuToggle();
    initCitySelector();
    initAccordion();
    updateCounts(products);
    sortProducts();
    initSorting(products);
    initSlider(products);
    initFormValidation();
    initEventListeners(products);
    initFormHandler();
});

