const usernameEl = document.querySelector('#un');
const emailEl = document.querySelector('#em');
const passwordEl = document.querySelector('#pw');
const confirmPasswordEl = document.querySelector('#spw');

const form = document.querySelector('#fo');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, "Le nom d'utilisateur ne peut pas être vide.");
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Doit contenir entre ${min} et ${max} caractères.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, "L'email ne peut pas être vide.");
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email invalide.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Le mot de passe ne peut pas être vide.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Lemot de passe doit au moins contenir 8 caractères qui incluent au moins 1 caractère minuscule, 1 caractère majuscule, 1 nombre, et 1 caractère spécial parmi (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    //------------------------------------------------------------------------------------------------------------------------------
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Veuillez resaisir le mot de passe.');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Les mots de passe ne sont pas identiques.');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\--0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    //------------------------------------------------------------------------------------------------------------------------------
    const formField = input.parentElement;
    //------------------------------------------------------------------------------------------------------------------------------
    formField.classList.remove('success');
    formField.classList.add('error');

    //------------------------------------------------------------------------------------------------------------------------------
    const error = formField.querySelector(' small > div');
    error.textContent = message;
};

const showSuccess = (input) => {
    //------------------------------------------------------------------------------------------------------------------------------
    const formField = input.parentElement;

    //------------------------------------------------------------------------------------------------------------------------------
    formField.classList.remove('error');
    formField.classList.add('success');

    //------------------------------------------------------------------------------------------------------------------------------
    const error = formField.querySelector(' small > div');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    //------------------------------------------------------------------------------------------------------------------------------
    e.preventDefault();

    //------------------------------------------------------------------------------------------------------------------------------
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    //------------------------------------------------------------------------------------------------------------------------------
    if (isFormValid) {
            window.location.href="acceuil.html";
    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        //------------------------------------------------------------------------------------------------------------------------------
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        //------------------------------------------------------------------------------------------------------------------------------
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));