Parse.Cloud.define("registerCheckin", async (request) => {
    const { passengerName, registrationNumber, busNumber } = request.params;

    
    const Checkin = Parse.Object.extend("Checkin");
    const query = new Parse.Query(Checkin);
    query.equalTo("passengerName", passengerName);
    const existingCheckin = await query.first();

    if (existingCheckin) {
        throw "Este passageiro já fez check-in.";
    }

    
    const checkin = new Checkin();
    checkin.set("passengerName", passengerName);
    checkin.set("registrationNumber", registrationNumber);
    checkin.set("busNumber", busNumber);
    checkin.set("checkinTime", new Date());

    await checkin.save();
    return `Check-in registrado para ${passengerName}`;
});

Parse.Cloud.define("registerCheckout", async (request) => {
    const { passengerName } = request.params;

    
    const Checkin = Parse.Object.extend("Checkin");
    const query = new Parse.Query(Checkin);
    query.equalTo("passengerName", passengerName);
    const checkin = await query.first();

    if (!checkin) {
        throw `O passageiro ${passengerName} não fez check-in.`;
    }

    
    const Checkout = Parse.Object.extend("Checkout");
    const checkout = new Checkout();
    checkout.set("passengerName", passengerName);
    checkout.set("checkoutTime", new Date());

    await checkout.save();
    return `Check-out registrado para ${passengerName}`;
});
