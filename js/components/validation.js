const form = document.getElementById('questions__form');

export const initFormValidation = () => {
    const initValidate = () => {
        const validate = new window.JustValidate('#questions__form', {
            errorFieldCssClass: 'is-invalid',
            successFieldCssClass: 'is-valid',
        });
    
        validate
            .addField('#name', [
                {
                    rule: 'required',
                    errorMessage: 'Поле "Ваше имя" обязательно для заполнения',
                },
                {
                    rule: 'minLength',
                    value: 3,
                    errorMessage: 'Минимальная длина имени — 3 символа',
                },
                {
                    rule: 'maxLength',
                    value: 20,
                    errorMessage: 'Максимальная длина имени — 20 символов',
                },
            ])
            .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Поле "Ваша почта" обязательно для заполнения',
                },
                {
                    rule: 'email',
                    errorMessage: 'Введите корректный адрес электронной почты',
                },
            ])
            .addField('#agree', [
                {
                    rule: 'required',
                    errorMessage: 'Необходимо согласие на обработку данных',
                },
            ])
    }
    initValidate();
};