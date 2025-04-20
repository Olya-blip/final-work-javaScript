export function updateCounts(products) {
    if (!products || !Array.isArray(products)) {
        // console.error('updateCounts: products не определен или не является массивом', products);
        return;
    }

    const checkboxes = document.querySelectorAll('.custom-checkbox__field');
    const counts = {};

    // Инициализация счётчика для каждой категории
    checkboxes.forEach(checkbox => {
        counts[checkbox.value] = 0; // Подготовка к подсчету для каждого типа
    });

    // Подсчет товаров по типам
    products.forEach(product => {
        if (Array.isArray(product.type)) {
            product.type.forEach(type => {
                if (counts.hasOwnProperty(type)) {
                    counts[type] += 1;
                }
            });
        }
    });

    // Обновляем количество товаров в чекбоксах
    checkboxes.forEach(checkbox => {
        const type = checkbox.value;
        const count = counts[type] || 0; // Используем 0 для типов без товаров
        const countSpan = checkbox.parentElement.querySelector('.custom-checkbox__count');

        if (countSpan) {
            countSpan.textContent = count; 
        } else {
            // console.warn(`Элемент с классом .custom-checkbox__count не найден для чекбокса ${type}.`);
        }
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCounts(products);
        });
    });
}