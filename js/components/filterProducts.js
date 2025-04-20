import { renderProducts } from './createProduct.js';
import { sortProducts } from './sortProducts.js';

const catalogForm = document.querySelector('.catalog-form');
const sortSelect = document.querySelector('.catalog__sort-select');

// Функция для проверки наличия товара
const isAvailable = (availability) => {
    return Object.values(availability).some(count => count > 0);
};

const filterAndSortProducts = (data) => {
    const selectedTypes = Array.from(document.querySelectorAll('#catalog-form__list-checkbox input[type="checkbox"]:checked')).map(input => input.value);
    const selectedStatus = document.querySelector('#catalog-form__list-radio input[name="status"]:checked').value;

    const filteredProducts = data.filter(product => {
        const available = isAvailable(product.availability);
        const typeMatch = selectedTypes.length === 0 || selectedTypes.some(type => product.type.includes(type));
        const statusMatch = selectedStatus === 'all-item' || (selectedStatus === 'instock' && available);

        return typeMatch && statusMatch;
    });

    const sortedProducts = sortProducts(filteredProducts, sortSelect.value); // Сортируем отфильтрованные продукты
    renderProducts(sortedProducts); // Отображаем отсортированные продукты
};

export const initEventListeners = (data) => {
    catalogForm.addEventListener('input', () => {
        filterAndSortProducts(data);
    });

    catalogForm.addEventListener('reset', () => {
        setTimeout(() => {
            filterAndSortProducts(data);
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            filterAndSortProducts(data); // При изменении сортировки также фильтруем и сортируем
        });
    } else {
        console.error('Элемент .catalog__sort-select не найден в DOM');
    }
};

// Инициализация: загрузка данных один раз и установка слушателей
async function initializeFilters(allProducts) {
    try {
        filterAndSortProducts(allProducts); // Изначальная фильтрация и сортировка
        initEventListeners(allProducts);
    } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
    }
}