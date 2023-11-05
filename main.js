var flightsArray = [];
let cheapestFlight = {"cost":10000}

function callGenerate(origin, destination, start, end, interval) {
    origin = "DFW";
    destination = "GSO";
    start = "2023-06-23";
    end = "2023-07-02";
    interval = "7";

    origin = document.getElementById('Origin').value;
    destination = document.getElementById('Destination').value;
    start = document.getElementById('IntervalStart').value;
    end = document.getElementById('IntervalEnd').value;
    interval = document.getElementById('TripLength').value;
    let days = getDaysArray(start, end, interval);

    // Create a map of fetch promises for departure flights
    let departurePromises = days.map(date => {
        let currentDay = date.toISOString().split('T')[0];
        let callString = `http://localhost:4000/flights?date=${currentDay}&origin=${origin}&destination=${destination}`;
        return fetch(callString).then(response => response.json());
    });

    // Create a map of fetch promises for return flights, adding the interval days to the departure dates
    let returnPromises = days.map(date => {
        let returnDate = new Date(date);
        returnDate.setDate(returnDate.getDate() + parseInt(interval)); // Set the return date based on the interval
        let currentDay = returnDate.toISOString().split('T')[0];
        let callString = `http://localhost:4000/flights?date=${currentDay}&origin=${destination}&destination=${origin}`;
        return fetch(callString).then(response => response.json());
    });

    // Wait for all promises from departures and returns to finish
    Promise.all([...departurePromises, ...returnPromises])
        .then(allFlightsData => {
            // Split the results back into departures and returns
            let departures = allFlightsData.slice(0, departurePromises.length);
            let returns = allFlightsData.slice(departurePromises.length);

            let roundTrips = [];

            // Combine departures and returns to find round-trip options
            departures.forEach((outboundFlights, index) => {
                outboundFlights.forEach(outboundFlight => {
                    returns[index].forEach(returnFlight => {
                        roundTrips.push({
                            outboundFlight,
                            returnFlight,
                            totalCost: outboundFlight.cost + returnFlight.cost
                        });
                    });
                });
            });

            // Find the cheapest round trip by total cost
            let cheapestRoundTrip = roundTrips.reduce((cheapest, trip) => {
                return !cheapest || trip.totalCost < cheapest.totalCost ? trip : cheapest;
            }, null);

            console.log("Cheapest round trip:", cheapestRoundTrip);
            localStorage.setItem('cheapestRoundTrip', JSON.stringify(cheapestRoundTrip));
            location.href = "second.html"
        })
        .catch(error => {
            console.error('Error fetching one or more flight data:', error);
        });
    
    /*
    days.forEach((date) => {
        currentDay = date.toISOString().split('T')[0];
        callString = "http://localhost:4000/flights?date=" + currentDay + "&origin=" + origin + "&destination=" + destination;
        console.log(callString)
        fetch(callString) // Replace with the actual URL you want to fetch from
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the JSON in the response
                return response.json();
            })
            .then(data => {
                // Work with the JSON data here
                // flightsArray.push(data);
                data.forEach(flight => {
                    if (flight.cost < cheapestFlight.cost) {
                        cheapestFlight = flight;
                    }
                });
            })
            .catch(error => {
                // Handle any errors here
                console.error('There was an error fetching the JSON', error);
            });
    });

    console.log("Sorted:", cheapestFlight);*/
}
function getDaysArray(start, end, interval) {
    let arr = [];
    let dt = new Date(start);
    let endDate = new Date(end);

    intervalInt = parseInt(interval);

    endDate.setDate(endDate.getDate() - interval);

    console.log(endDate);

    while (dt <= endDate) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }

    return arr;
}

function getCheapestRoundTripFromStorage() {
    let storedData = localStorage.getItem('cheapestRoundTrip');
    return storedData ? JSON.parse(storedData) : null;
}

function printRoundTrip() {
    roundTripData = getCheapestRoundTripFromStorage();

    obt = roundTripData.outboundFlight;
    rt = roundTripData.returnFlight;

    obtDeparture = obt.departureTime;
    obtArrival = obt.arrivalTime;

    obtOrigin = obt.origin.code;
    obtDestination = obt.destination.code;
    obtCost = obt.cost;

    obtLat = obt.destination.location.latitude;
    obtLong = obt.destination.location.longitude;

    rtDepart = rt.departureTime;
    rtArrive = rt.arrivalTime;
    
    rtOrigin = rt.origin;
    rtDestination = rt.destination.code;
    rtCost = rt.cost;

    rtLat = rt.destination.location.latitude;
    rtLong = rt.destination.location.longitude;

    console.log(obtLat, obtLong);

    var obtInfoHtml = `
        <h2>Flight from ${obtOrigin} to ${obtDestination}</h2>
        <p>Departure Time: ${obtDeparture}</p>
        <p>Arrival Time: ${obtArrival}</p>
        <p>Cost: ${obtCost}</p>
    `;
    document.getElementById('outFlight').innerHTML = obtInfoHtml
}



