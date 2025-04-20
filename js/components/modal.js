const form = document.getElementById('questions__form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const agreeInput = document.getElementById('agree');

export function initFormHandler(formId) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение формы

        const formData = new FormData(this);

        // Проверка заполненности всех полей
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const agree = agreeInput.checked;

        if (!name || !email || !agree) {
            showModal('Пожалуйста, заполните все поля.'); // Показать сообщение
            return; // Прекратить выполнение функции
        }

        const actionUrl = form.action;
        try {
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Если успешная отправка
                showModal('Регистрация прошла успешно!');
                form.reset(); // Очищаем поля формы
            } else {
                // Если ошибка на стороне сервера
                showModal('Ошибка! Регистрация не прошла. Пожалуйста, попробуйте еще раз.');
            }
        } catch (error) {
            // Если ошибка сети
            console.error('Ошибка:', error);
            showModal('Ошибка! Регистрация не прошла. Пожалуйста, попробуйте еще раз.');
        }
    });
}

// Функция для показа модального окна
function showModal(message) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('modal__close');
    closeButton.innerHTML = '&times;'; // Крестик для закрытия

    closeButton.onclick = function () {
        modal.style.display = 'none';
        document.body.removeChild(modal); // Удаляем модальное окно из DOM
    };

    modalContent.appendChild(closeButton);
    const modalMessage = document.createElement('p');
    modalMessage.textContent = message;
    modalContent.appendChild(modalMessage);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Показать модальное окно
    modal.style.display = 'flex';

    // Закрытие модального окна при клике вне модального окна
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal); // Удаляем модальное окно из DOM
        }
    };

    // Закрытие модального окна при нажатии на клавишу ESC
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
            document.body.removeChild(modal); // Удаляем модальное окно из DOM
        }
    });
}