const { getBadges } = require("./badgeAPI.js");

const userID = "2063627535";
const placeID = "8562822414";

getBadges(userID, placeID)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
