function filterGoods(goods, typeFilter) {
    if (!Array.isArray(goods)) {
        return []; // Возвращаем пустой массив, если goods не массив
    }

    return goods.filter(good => {
        const isAvailable = Object.values(good.availability).some(count => count > 0);
        const matchesType = !typeFilter || good.type === typeFilter;
        return isAvailable && matchesType;
    });
}

// Функция для сортировки товаров по цене
function sortByPrice(goods) {
    return goods.sort((a, b) => a.price.new - b.price.new);
}

// Функция для сортировки товаров по популярности (рейтингу)
function sortByRating(goods) {
    return goods.sort((a, b) => b.rating - a.rating);
}