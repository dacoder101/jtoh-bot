const {
    capitalizeWords,
    dashBeforeCapitals,
    findKeyByValue,
    findClosestDownwardValue,
} = require("./func");

const difficultyMappings = {
    easy: 1,
    medium: 2,
    hard: 3,
    difficult: 4,
    challenging: 5,
    intense: 6,
    remorseless: 7,
    insane: 8,
    extreme: 9,
    terrifying: 10,
    catastrophic: 11,
    horrific: 12,
    unreal: 13,
    nil: 14,
};

const decimalDifficultyMappings = {
    baseline: 0,
    bottom: 0.01,
    bottomLow: 0.11,
    low: 0.22,
    lowMid: 0.33,
    mid: 0.45,
    midHigh: 0.56,
    high: 0.67,
    highPeak: 0.78,
    peak: 0.89,
};

class AreaDoesNotExistError extends Error {
    constructor(area) {
        super(`Area "${area}" does not exist.`);
    }
}

class DifficultyDoesNotExistError extends Error {
    constructor(difficulty) {
        super(`Difficulty "${difficulty}" does not exist..`);
    }
}

class Tower {
    static getAcyronym(towerName) {
        return towerName
            .split(" ")
            .map((word) =>
                ["and", "of", "the"].includes(word.toLowerCase())
                    ? word[0].toLowerCase()
                    : word[0].toUpperCase()
            )
            .join("");
    }

    static difficultyName(difficulty) {
        const baseDifficulty = Math.floor(difficulty);

        if (!Object.values(difficultyMappings).includes(baseDifficulty)) {
            throw new DifficultyDoesNotExistError(difficulty);
        }

        const baseDifficultyName = Object.keys(difficultyMappings).find(
            (key) => difficultyMappings[key] === baseDifficulty
        );

        const decimalDifficulty = parseFloat(
            (difficulty - Math.floor(difficulty)).toFixed(2)
        );

        return capitalizeWords(
            `${dashBeforeCapitals(
                findKeyByValue(
                    decimalDifficultyMappings,
                    findClosestDownwardValue(
                        Object.values(decimalDifficultyMappings),
                        decimalDifficulty
                    )
                )
            )} ${baseDifficultyName}`
        );
    }

    constructor(name, difficulty) {
        this.name = "Tower of " + name;
        this.acyronym = Tower.getAcyronym(this.name);
        this.difficulty = difficulty;
        this.difficultyName = Tower.difficultyName(difficulty);
    }
}

// Floors for towers should default at ten, but should be an optional argument.
// This should be renamed to tower.js, and JToH.js should include all JToH towers.
// Server administrators should be able to add towers not present in the game/unverifiable by badgeID.
// BadgeID should be another optional argument, defaulting to null. Null towers will need to be added to a player manually.
