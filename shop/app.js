// // countdown
// function updateCountdown() {
//     const now = new Date();
//     const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
//     const timeDiff = nextMidnight - now;

//     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//     document.getElementById('countdown').textContent =
//         `[ ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ]`;
// }

// setInterval(updateCountdown, 1000);
// updateCountdown();

// // particles
// particlesJS("particles-js", {
//     "particles": {
//         "number": {
//             "value": 160,
//             "density": {
//                 "enable": true,
//                 "value_area": 800
//             }
//         },
//         "color": {
//             "value": "#ffffff"
//         },
//         "shape": {
//             "type": "circle",
//             "stroke": {
//                 "width": 0,
//                 "color": "#000000"
//             },
//             "polygon": {
//                 "nb_sides": 5
//             },
//             "image": {
//                 "src": "img/github.svg",
//                 "width": 100,
//                 "height": 100
//             }
//         },
//         "opacity": {
//             "value": 1,
//             "random": true,
//             "anim": {
//                 "enable": true,
//                 "speed": 1,
//                 "opacity_min": 0,
//                 "sync": false
//             }
//         },
//         "size": {
//             "value": 3,
//             "random": true,
//             "anim": {
//                 "enable": false,
//                 "speed": 4,
//                 "size_min": 0.3,
//                 "sync": false
//             }
//         },
//         "line_linked": {
//             "enable": false,
//             "distance": 150,
//             "color": "#ffffff",
//             "opacity": 0.4,
//             "width": 1
//         },
//         "move": {
//             "enable": true,
//             "speed": 1,
//             "direction": "none",
//             "random": true,
//             "straight": false,
//             "out_mode": "out",
//             "bounce": false,
//             "attract": {
//                 "enable": false,
//                 "rotateX": 600,
//                 "rotateY": 600
//             }
//         }
//     },
//     "interactivity": {
//         "detect_on": "canvas",
//         "events": {
//             "onhover": {
//                 "enable": false,
//                 "mode": "repulse"
//             },
//             "onclick": {
//                 "enable": false,
//                 "mode": "repulse"
//             },
//             "resize": true
//         },
//         "modes": {
//             "grab": {
//                 "distance": 400,
//                 "line_linked": {
//                     "opacity": 1
//                 }
//             },
//             "bubble": {
//                 "distance": 250,
//                 "size": 0,
//                 "duration": 2,
//                 "opacity": 0,
//                 "speed": 3
//             },
//             "repulse": {
//                 "distance": 400,
//                 "duration": 0.4
//             },
//             "push": {
//                 "particles_nb": 4
//             },
//             "remove": {
//                 "particles_nb": 2
//             }
//         }
//     },
//     "retina_detect": true
// });

// populating the shop
document.addEventListener('DOMContentLoaded', () => {
    function preloadImages(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    function createShopItem(name, usage, price, imgSrc, bgColor) {
        const itemWrapperBorder = document.createElement('div');
        itemWrapperBorder.className = 'item-wrapper-border';

        itemWrapperBorder.innerHTML = `
            <div class="item-wrapper medkit-item" style="background-color: ${bgColor};">
                <img src="${imgSrc}" alt="${name}" class="shop-item-img" draggable="false">
                <div class="item-info">
                    <span class="item-name">${name}</span>
                    <span class="item-usage">${usage}</span>
                </div>
                <span class="item-price-wrapper">
                    <i class="fi fi-br-badge item-currency"></i>
                    <span class="item-price">${price}</span>
                </span>
            </div>
        `;

        itemWrapperBorder.addEventListener('click', () => {
            showBuyConfirmation(name, price, imgSrc);
        });

        return itemWrapperBorder;
    }

    function showBuyConfirmation(name, price, imgSrc) {
        const buyConf = document.getElementById('buyConf');
        document.getElementById('confItemName').textContent = name;
        document.getElementById('confItemPrice').textContent = price;
        document.getElementById('confItemImage').src = imgSrc;

        buyConf.classList.add('active');
    }

    function populateShop(items) {
        const mainShop = document.getElementById('mainShop');
        const imageUrls = [];

        items.forEach(item => {
            const shopItem = createShopItem(item.name, item.usage, item.price, item.imgSrc, item.bgColor);
            mainShop.appendChild(shopItem);
            imageUrls.push(item.imgSrc);
        });

        preloadImages(imageUrls);
    }

    function showNotification(name, imgSrc, duration = 5000) {
        const notificationContainer = document.getElementById('notificationContainer');
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const messageElem = document.createElement('span');
        messageElem.className = 'message';
        messageElem.textContent = `${name} bought!`;
        
        const imgElem = document.createElement('img');
        imgElem.src = imgSrc;
        imgElem.alt = name;
        imgElem.className = 'shop-item-img';
    
        
        notification.appendChild(imgElem);
        notification.appendChild(messageElem);
        notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, duration);
    }

    const cancelButton = document.getElementById('cancelPurchaseButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            document.getElementById('buyConf').classList.remove('active');
        });
    }

    const confirmButton = document.getElementById('confirmPurchaseButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            const confItemName = document.getElementById('confItemName').textContent;
            const confItemImage = document.getElementById('confItemImage').src;
            document.getElementById('buyConf').classList.remove('active');
            showNotification(confItemName, confItemImage);
            console.log(`Purchase made for item: ${confItemName}`);
        });
    }

    const shopItems = [
        { name: 'Medkit', usage: 'One Time', price: 99, imgSrc: './imgs/200px-MedkitIcon.png', bgColor: '#ff3938' },
        { name: 'Candy', usage: 'One Time', price: 79, imgSrc: './imgs/200px-CandyBagIcon.webp', bgColor: '#53208d' },
        { name: 'Armour', usage: 'One Time', price: 49, imgSrc: './imgs/200px-HeavyArmorIcon.png', bgColor: '#4f473e' }
    ];

    populateShop(shopItems);
});