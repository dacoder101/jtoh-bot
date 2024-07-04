function capitalizeWords(str) {
    return str
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function dashBeforeCapitals(str) {
    return str.replace(/([A-Z])/g, "-$1").trim();
}

module.exports = { capitalizeWords, dashBeforeCapitals };
