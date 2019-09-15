export const getLocation = () => {
  const geolocation = navigator.geolocation;

  return new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error("Not Supported"));
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      () => {
        reject(new Error("Permission denied"));
      }
    );
  });

  // location.then(function(value) {
  //   return {
  //     payload: value
  //   }
  // })
  // return {
  //   payload: location
  // }
};

export const locationToString = (lat, long) => {
  return lat.toString() + "," + long.toString();
};
