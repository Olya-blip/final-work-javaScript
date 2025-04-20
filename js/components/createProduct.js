import { Basket} from './basket.js';
import {sortProducts} from './sortProducts.js';

// Инициализация корзины
const basket = new Basket();

const catalogList = document.querySelector('.catalog__list');
const sortSelect = document.querySelector('.catalog__sort-select');

// Функция для рендеринга продуктов на странице
export const renderProducts = (products) => {
    catalogList.innerHTML = ''; // Очищаем список перед рендерингом
    
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'catalog__item';
        li.innerHTML = `
            <div class="product-card">
                <div class="product-card__visual">
                    <img class="product-card__img" src="${product.image}" height="436" width="290" alt="${product.name}">
                    <div class="product-card__more">
                        <a href="#" class="product-card__link btn btn--icon add-to-cart" data-id="${product.id}">
                            <span class="btn__text">В корзину</span>
                            <svg width="24" height="24" aria-hidden="true">
                                <use xlink:href="images/sprite.svg#icon-basket"></use>
                            </svg>
                        </a>
                        <a href="#" class="product-card__link btn btn--secondary">
                            <span class="btn__text">Подробнее</span>
                        </a>
                    </div>
                </div>
                <div class="product-card__info">
                    <h2 class="product-card__title">${product.name}</h2>
                    <span class="product-card__old">
                        <span class="product-card__old-number">${product.price.old}</span>
                        <span class="product-card__old-add">₽</span>
                    </span>
                    <span class="product-card__price">
                        <span class="product-card__price-number">${product.price.new}</span>
                        <span class="product-card__price-add">₽</span>
                    </span>
                </div>
            </div>
        `;
        catalogList.appendChild(li); // Добавляем элемент в список

        // Добавляем обработчик событий для кнопки "Добавить в корзину"
        const addToCartButton = li.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            basket.addItem(product); // Передаем продукт и экземпляр корзины
        });
    });
};

// Инициализация загрузка продуктов
export function initProducts(products) {
    const sortedProducts = sortProducts(products, sortSelect.value);
    try {
        // Проверяем, что products определен и является массивом
        if (!products || !Array.isArray(products)) {
            console.error('Неверные данные вместо массива:', products);
            return;
        }
        renderProducts(sortedProducts);
    } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
    }
}