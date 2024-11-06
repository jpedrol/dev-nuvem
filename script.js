const checkinForm = document.getElementById('checkin-form');
const checkoutForm = document.getElementById('checkout-form');
const checkinList = document.getElementById('checkin-list');
const checkoutList = document.getElementById('checkout-list');

let checkins = [];

checkinForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const passengerName = document.getElementById('passenger-name').value;
    const registrationNumber = document.getElementById('registration-number').value;
    const busNumber = document.getElementById('bus-number').value;

    const checkinItem = document.createElement('li');
    checkinItem.textContent = `${passengerName} (Matrícula: ${registrationNumber}) - Ônibus ${busNumber}`;
    checkinList.appendChild(checkinItem);

    checkins.push(passengerName);

    checkinForm.reset();
});

checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const checkoutPassengerName = document.getElementById('checkout-passenger-name').value;

    if (!checkins.includes(checkoutPassengerName)) {
        alert(`O passageiro ${checkoutPassengerName} não fez check-in e não pode fazer check-out!`);
        return; 
    }

    const checkoutItem = document.createElement('li');
    checkoutItem.textContent = `${checkoutPassengerName} - Check-out registrado`;
    checkoutList.appendChild(checkoutItem);

    checkoutForm.reset();
});
