import {renderProducts} from './createProduct.js';

const productList = document.querySelector('.catalog__list');
const sortSelect = document.querySelector('.catalog__sort-select');

// Функция для сортировки продуктов по выбранному критерию
export const sortProducts = (products, criterion) => {
    if (!Array.isArray(products)) {
        return []; // Возвращаем пустой массив, если нет данных
    }

    return products.slice().sort((a, b) => {
        switch (criterion) {
            case 'price-min':
                return a.price.new - b.price.new; // Сначала дешёвые
            case 'price-max':
                return b.price.new - a.price.new; // Сначала дорогие
            case 'rating-max':
                return b.rating - a.rating; // Сначала популярные
            default:
                return 0; // Если критерий не распознан, оставляем порядок прежним
        }
    });
};

/// Обновление отображения продуктов на странице
const displayProducts = (products) => {
    // Проверяем, существует ли productList
    if (!productList) {
        console.error('Элемент .catalog__list не найден в DOM');
        return; // Если элемент не найден, ничего не делаем
    }

    productList.innerHTML = ''; // Очищаем текущий список

    // Проверяем, что products - массив
    if (!Array.isArray(products)) {
        return; // Если products не массив, ничего не делаем
    }

    renderProducts(products)
};

// Инициализация сортировки
export const initSorting = async (products) => {
    if (sortSelect) { // Проверка на существование селектора
        sortSelect.addEventListener('change', () => {
            const sortedProducts = sortProducts(products, sortSelect.value); // Сортируем по выбранному критерию
            displayProducts(sortedProducts); // Обновляем отображение
        });
    } else {
        console.error('Элемент .catalog__sort-select не найден в DOM');
    }
};