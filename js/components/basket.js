export class Basket {
    constructor(products) { 
        this.products = products; // Сохраняем продукты
        this.basketToggle = document.querySelector('.header__user-btn');
        this.basketDropdown = document.querySelector('.header__basket');
        this.basketList = document.querySelector('.basket__list');
        this.emptyBlock = document.querySelector('.basket__empty-block');
        this.itemCountDisplay = document.querySelector('.header__user-count');
        this.basketItems = []; // Массив для хранения товаров в корзине
        this.basketButton = document.querySelector('.basket__item-close')

        this.init();
    }

    init() {
        this.basketToggle.addEventListener('click', () => {
            this.toggleBasket();
        });
    }

    toggleBasket() {
        this.basketDropdown.classList.toggle('basket--active');
    }

    addItem(product) {
        // Проверка на дубликаты
        if (!this.basketItems.some(item => item.id === product.id)) {
            this.basketItems.push(product);
            this.updateBasket();
        } else {
            console.log('Товар уже в корзине');
        }
    }

    updateBasket() {
        this.basketList.innerHTML = ''; // Очищаем список перед обновлением
        this.basketItems.forEach(item => {
            const basketItem = document.createElement('li');
            basketItem.classList.add('basket__item');
            basketItem.innerHTML = `
                <div class="basket__img">
                    <img src="${item.image}" alt="${item.name}" height="60" width="60">
                </div>
                <span class="basket__name">${item.name}</span>
                <span class="basket__price">${item.price.new} руб</span> <!-- Используем новую цену -->
                <button class="basket__item-close" type="button" data-id="${item.id}">
                    <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-close"></use>
                    </svg>
                </button>
            `;
            this.basketList.appendChild(basketItem);
        });

        this.emptyBlock.style.display = this.basketItems.length === 0 ? 'block' : 'none';
        this.itemCountDisplay.textContent = this.basketItems.length;

        // Обработчик для кнопок удаления
        this.basketList.querySelectorAll('.basket__item-close').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.closest('.basket__item-close').dataset.id;
                this.removeItem(productId);
            });
        });
    }

    removeItem(productId) {
        this.basketItems = this.basketItems.filter(item => item.id !== Number(productId));
        this.updateBasket();
    }
}