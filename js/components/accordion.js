export function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion__btn');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentlyActiveButton = document.querySelector('.accordion__btn--active');
            button.classList.toggle('accordion__btn--active');
            // Закрываем все пункты
            if (currentlyActiveButton) {
                currentlyActiveButton.classList.remove('accordion__btn--active');
            }
        });
    });
}