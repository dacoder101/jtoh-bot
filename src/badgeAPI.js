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

        if (placeID) {
            data = data.filter((badge) => {
                return badge.awarder.id == placeID;
            });
        }

        const jsonData = JSON.stringify(data, null, 4);
        fs.writeFileSync("response.json", jsonData, "utf8");

        return jsonData;
    } catch (error) {
        console.error(error);
    }
}

getBadges(1003292787, 8562822414);

module.exports = { getBadges };
