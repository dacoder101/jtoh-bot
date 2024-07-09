const {
    capitalizeWords,
    dashBeforeCapitals,
    findKeyByValue,
    findClosestDownwardValue,
} = require("./func");
const fs = require("fs");
const path = require("path");

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

class ValueEmptyError extends Error {
    constructor(value) {
        super(`Value "${value}" is empty.`);
    }
}

class AreaDoesNotExistError extends Error {
    constructor(area) {
        super(`Area "${area}" does not exist.`);
    }
}

class DifficultyDoesNotExistError extends Error {
    constructor(difficulty) {
        super(`Difficulty "${difficulty}" does not exist.`);
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

    constructor(name, difficulty, floors = 10, badgeID = null) {
        this.name = name;
        this.acyronym = Tower.getAcyronym(name);
        this.difficulty = difficulty;
        this.difficultyName = Tower.difficultyName(difficulty);
        this.floors = floors;
        this.badgeID = badgeID;
    }
}

class Steeple extends Tower {
    constructor(name, difficulty, floors, badgeID = null) {
        super(name, difficulty, floors, badgeID);
    }
}

class Citadel extends Tower {
    constructor(name, difficulty, floors, badgeID = null) {
        super(name, difficulty, floors, badgeID);
    }
}

class Obelisk extends Tower {
    constructor(name, difficulty, floors, badgeID = null) {
        super(name, difficulty, floors, badgeID);
    }
}

function JSONToTowers(input) {
    let jsonData;

    try {
        jsonData = JSON.parse(input);
    } catch (e) {
        const absolutePath = path.resolve(__dirname, input);
        jsonData = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
    }
}

module.exports = {
    difficultyMappings,
    decimalDifficultyMappings,
    ValueIsEmptyError,
    AreaDoesNotExistError,
    DifficultyDoesNotExistError,
    Tower,
    Steeple,
    Citadel,
    Obelisk,
    JSONToTowers,
};
