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

const worldMappings = {
    "The Great Inferno": [
        "Ring 1",
        "Ring 2",
        "Ring 3",
        "Ring 4",
        "Ring 5",
        "Ring 6",
        "Ring 7",
        "Ring 8",
        "Ring 9",
        "Forgotten Ridge",
        "Garden of Eeshöl",
        "Silent Abyss",
        "Lost River",
        "Ashen Towerworks",
    ],

    "Spatial System": [
        "Zone 1",
        "Zone 2",
        "Zone 3",
        "Zone 4",
        "Zone 5",
        "Zone 6",
        "Zone 7",
        "Zone 8",
        "Paradise Atoll",
        "Arcane Area",
        "Pit of Misery",
    ],
};

const nineFloorTowers = ["Tower of Screen Punching", "Tower of Oblivion"];

class AreaDoesNotExistError extends Error {
    constructor(area) {
        super(`Area "${area}" does not exist.`);
    }
}

class Tower {
    static getAcyronym(towerName) {
        return towerName
            .split(" ")
            .map((word) =>
                ["and", "of", "the"].includes(word)
                    ? word[0].toLowerCase()
                    : word[0].toUpperCase()
            )
            .join("");
    }

    static findWorld(area) {
        for (const world in worldMappings) {
            if (worldMappings[world].includes(area)) {
                return world;
            }
        }

        throw new AreaDoesNotExistError(area);
    }

    static difficultyName(difficulty) {
        const baseDifficultyName = Object.keys(difficultyMappings).find(
            (difficultyNum) =>
                difficultyMappings[difficultyNum] === Math.floor(difficulty)
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

    constructor(name, difficulty, area) {
        this.name = "Tower of " + name;
        this.acyronym = Tower.getAcyronym(this.name);
        this.difficulty = difficulty;
        this.difficultyName = Tower.difficultyName(difficulty);
        this.world = Tower.findWorld(area);
        this.area = area;
        this.floors = nineFloorTowers.includes(this.name) ? 9 : 10;
    }
}

class Steeple extends Tower {
    constructor(name, difficulty, area, floors) {
        super(name, difficulty, area);
        this.name = "Steeple of " + name;
        this.acyronym = Tower.getAcyronym(this.name);
        this.floors = floors;
    }
}

class Citadel extends Steeple {
    constructor(name, difficulty, area, floors) {
        super(name, difficulty, area, floors);
        this.name = "Citadel of " + name;
        this.acyronym = Tower.getAcyronym(this.name);
    }
}

const towers = [
    new Tower("Annoyingly Simple Trials", 1.89, "Ring 1"),
    new Tower("Oblivion", 9.0, "Zone 1"),
    new Steeple("Stupidness", 1.11, "Ring 1", 5),
    new Citadel("Peril", 1.11, "Ring 1", 15),
];

console.log(towers);
