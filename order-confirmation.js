const orderData = JSON.parse(localStorage.getItem('orderData'));
console.log(orderData)

document.getElementById('confirm-name').textContent = `Name: ${orderData.name}`;
document.getElementById('confirm-email').textContent = `Email: ${orderData.email}`;
document.getElementById('confirm-address').textContent = `Address: ${orderData.address}`;
document.getElementById('confirm-city').textContent = `City: ${orderData.city}`;
document.getElementById('confirm-state').textContent = `State: ${orderData.state}`;
document.getElementById('confirm-zip').textContent = `Zip Code: ${orderData.zip}`;
document.getElementById('confirm-card-number').textContent = `Card Number: **** **** **** ${orderData['card-number'].slice(-4)}`;
