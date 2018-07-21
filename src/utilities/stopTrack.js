import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import realm from "./realm";
import {calcDistance} from './calcDistance'
import {calcTimeTaken} from './calcTimeTaken'

function pushToDatabase(lat, lon, time) {
  const totaltrips = realm.objects("Trips").length;

  realm.write(() => {
    console.log("Values in Push to Database")
    console.log("Lat Array: " + lat);
    console.log("Lon Array: " + lon);
    console.log("Time Array: " + time);

    const newTrip = realm.create("Trips", {
      tripID: totaltrips + 1,
      lat: lat,
      lon: lon,
      timestamp: time,
      distance: 0,
      timetaken: 0
    });
    newTrip.distance = calcDistance(newTrip);
    newTrip.timetaken = calcTimeTaken(newTrip);
  });
}

export const stopTrack = (lat, lon, time) => {
  // unregister all event listeners
  console.log("Values in Stop Track")
  console.log("Lat Array: " + lat);
  console.log("Lon Array: " + lon);
  console.log("Time Array: " + time);
  pushToDatabase(lat, lon, time);

  BackgroundGeolocation.stop();
  BackgroundGeolocation.events.forEach(event =>
    BackgroundGeolocation.removeAllListeners(event)
  );
};
