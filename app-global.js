// login/logout buttons
var logoutButtonNav = document.getElementById('logoutButtonNav');
var loginButtonNav = document.getElementById('loginButtonNav');
var loginWarning = document.getElementById('loginWarning');
var shopWrapper = document.getElementById('shopWrapper');
var mainShop = document.getElementById('mainShop');

let siteToken;
const user = localStorage.getItem('user');

if (user) {
    siteToken = JSON.parse(user).siteToken;
} else {
    siteToken = null;
}

if (siteToken === null) {
    logoutButtonNav.style.display = 'none';
    loginWarning.style.display = 'flex';
    shopWrapper.style.display = 'none';
    mainShop.style.display = 'none';

} else {
    loginButtonNav.style.display = 'none';
    loginWarning.style.display = 'none';
    shopWrapper.style.display = 'flex';
    mainShop.style.display = 'flex';
}



logoutButtonNav.style.display = 'none';

// navbar hiding function
var nav = document.getElementById('nav');
var prevScrollpos = window.pageYOffset;

window.LOGIN_LINK =
    'https://discord.com/oauth2/authorize?client_id=1156866965265203302&response_type=code&redirect_uri=https%3A%2F%2Fnew.foundationxservers.com%2Flogin%2F&scope=identify+connections';

window.onscroll = function () {
    const burgerMenuButton = document.getElementById('burgerMenuButton');
    if (burgerMenuButton.getAttribute('burger-menu') === 'false') {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById('nav').style.top = '0';
            document.getElementById('nav').style.opacity = '1';
        } else {
            document.getElementById('nav').style.top = '-5rem';
            document.getElementById('nav').style.opacity = '0';
        }
        prevScrollpos = currentScrollPos;
    }
};

// preloader
window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');

    this.document.querySelectorAll('.discord-login-button').forEach((e) => (e.href = window.LOGIN_LINK));

    this.document.querySelectorAll('.discord-logout-button').forEach((e) => {
        e.addEventListener('click', async () => {
            const rawUser = localStorage.getItem('user');
            if (rawUser === null) return;

            const user = JSON.parse(rawUser);

            const response = await fetch('https://api.foundationxservers.com/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.siteToken}`,
                },
            });

            if (response.status === 200) {
                localStorage.removeItem('user');
                console.log('Successfully logged out');
            } else {
                window.alert('logout failed uh oh');
            }
        });
    });

    setTimeout(() => {
        preloader.style.scale = '1.1';
        preloader.style.pointerEvents = 'none';
        preloader.style.opacity = '0%';
        console.log('successfully loaded');

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 2500);
    }, 500);
});

function toggleBurgerMenu() {
    const burgerMenuButton = document.getElementById('burgerMenuButton');
    const currentState = burgerMenuButton.getAttribute('burger-menu') === 'true';
    const newState = !currentState;
    burgerMenuButton.setAttribute('burger-menu', newState);

    if (newState) {
        openMenuFunction();
    } else {
        closeMenuFunction();
    }
}

function openMenuFunction() {
    console.log('Menu opened');
    var burgerMenuScreen = document.getElementById('burgerMenu');
    var burgerIcon = document.getElementById('burgerIcon');
    var crossIcon = document.getElementById('crossIcon');

    burgerMenuScreen.style.pointerEvents = 'all';
    burgerMenuScreen.style.scale = '1';
    burgerMenuScreen.style.opacity = '1';

    burgerIcon.style.scale = '0';
    burgerIcon.style.opacity = '0';

    crossIcon.style.scale = '1';
    crossIcon.style.opacity = '1';

    document.getElementById('nav').style.top = '0';
    document.getElementById('nav').style.opacity = '1';
}

function closeMenuFunction() {
    console.log('Menu closed');
    var burgerMenuScreen = document.getElementById('burgerMenu');
    var burgerIcon = document.getElementById('burgerIcon');
    var crossIcon = document.getElementById('crossIcon');

    burgerMenuScreen.style.pointerEvents = 'none';
    burgerMenuScreen.style.scale = '1.2';
    burgerMenuScreen.style.opacity = '0';

    burgerIcon.style.scale = '1';
    burgerIcon.style.opacity = '1';

    crossIcon.style.scale = '0';
    crossIcon.style.opacity = '0';
}