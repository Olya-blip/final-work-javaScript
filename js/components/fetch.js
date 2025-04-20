export async function loadProducts() {
    const response = await fetch('./data/data.json');
    if (!response.ok) {
        throw new Error(`Ошибка при загрузке данных: ${response.statusText}`);
    }
    const products = await response.json();
    if (!Array.isArray(products)) {
        throw new Error('Загруженные данные не являются массивом');
    }
    return products;
}