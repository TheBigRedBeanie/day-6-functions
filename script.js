const user = { username: 'jon', password: 'pass123' };

const cart = [];
console.log('cart', cart.length);

let loggedInUser = null;

function handleLogin(event) {
    event.preventDefault();
    const usernameElement = document.getElementById('username');
    console.log('usernameElement', usernameElement);
    const username = usernameElement.value;
    console.log('username', username);
    const passwordElement = document.getElementById('password');
    console.log('passwordElement', passwordElement);
    const password = passwordElement.value;
    console.log('password', password);

    if (user.username !== username || user.password !== password) {
        alert(`username/password not found`);
        return;
    } else {
        loggedInUser = user;
        console.log('loggedInUser', loggedInUser);
    }

    let welcomeMessageElement = document.getElementById('welcome-message');
    welcomeMessageElement.innerText = `Welcome ${user.username}!`;
}

function addToCart(item, price) {
    let totalCost = 0;
    let totalQuantity = 0;
    let quanityCost = 0;

    if (cart.length === 0) {
        const objectToInsert = {
            drink: item,
            cost: price,
            quantity: 1,
        };
        cart.push(objectToInsert);
        console.log('am i getting this far');
    } else {
        // search for existing object in cart
        for (let index = 0; index < cart.length; index++) {
            console.log('for loop is starting');

            if (cart[index].drink === item) {
                cart[index].quantity++;
                quantityCost = cart[index].cost * cart[index].quantity;
            } else {
                const objectToInsert = {
                    drink: item,
                    cost: price,
                    quantity: 1,
                };
                cart.push(objectToInsert);
            }
        }
    }

    let ulElement = document.getElementById('cart-items');
    let liElement = document.createElement('li');

    for (let index = 0; index < cart.length; index++, totalQuantity++) {
        console.log('index', index);
        console.log('cart[index]', cart[index]);
        liElement.innerText = `Item: ${cart[index].drink}, Price: ${cart[
            index
        ].cost.toFixed(2)}, Quantity: ${cart[index].quantity}`;
        ulElement.appendChild(liElement);
        console.log('li', liElement);

        let totalElement = document.getElementById('total');

        totalCost += cart[index].cost;

        totalElement.innerText = totalCost.toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getUserLocation();
});

function getUserLocation(position) {
    console.log('function starting');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log('position', position);
            console.log('latitude', latitude);
            console.log('longitude', longitude);
            getWeather(latitude, longitude);
        });
    }

}


function getWeather(latitude, longitude){
    console.log('get weather');
    console.log('lat', latitude);
    console.log('long', longitude);

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&&appid=30e061c6bbcc3707c890ba56e5b98c94`;

    fetch(weatherURL)
    .then(response => {
        console.log('response', response)
    })
}

