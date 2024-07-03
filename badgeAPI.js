const axios = require("axios");
const fs = require("fs");

async function getBadges(userID, placeID = null) {
    const params = {
        limit: "100",
        sortOrder: "Desc",
    };

    try {
        const response = await axios.get(
            `https://badges.roblox.com/v1/users/${userID}/badges`,
            { params }
        );

        let data = response.data.data;
        console.log("Fetched data:", data);

        if (placeID) {
            console.log("Filtering badges for placeID:", placeID);

            data = data.filter((badge) => {
                return badge.awarder.id == placeID;
            });

            console.log("Filtered data:", data);
        }

        const jsonData = JSON.stringify(data, null, 4);
        fs.writeFileSync("response.json", jsonData, "utf8");

        return jsonData;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getBadges };
