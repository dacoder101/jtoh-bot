function capitalizeWords(str) {
    return str
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function dashBeforeCapitals(str) {
    return str.replace(/([A-Z])/g, "-$1").trim();
}

function findKeyByValue(dictionary, value) {
    return Object.keys(dictionary).find((key) => dictionary[key] === value);
}

function findClosestDownwardValue(array, target) {
    const filteredArray = array.filter((value) => value <= target);
    if (filteredArray.length === 0) {
        return null;
    }
    return Math.max(...filteredArray);
}

module.exports = {
    capitalizeWords,
    dashBeforeCapitals,
    findKeyByValue,
    findClosestDownwardValue,
};
