const fs = require("fs");
const doc = createHTML();
const jsonData = require("./data.json");
const green = "\x1b[38;5;46m";
const orange = "\x1b[38;5;215m";
const fillerText = [
  "▌",
  "■",
  "▬",
  "█",
  "▐",
  "p",
  "[",
  "]",
  "{",
  "}",
  "(",
  ")",
  "/",
  ".",
  ",",
  ";",
  ":",
  "0",
  "1",
  "b",
  "c",
  "a",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "q",
  "z",
  "-",
  "=",
  "►",
  "◄",
  "▌",
  "■",
  "▬",
  "█",
  "▐",
  "▌",
  "■",
  "▬",
  "█",
  "▐",
];

startUp();

function startUp() {
  let args = getArgsFromPy();
  createClass(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
}

function createClass(
  karmaBool,
  skillsBool,
  challengesBool,
  challengeQty,
  specialBool,
  game,
  output,
) {
  let karma = "";
  if (karmaBool) {
    karma = getKarma();
  }

  let skills = ["N/A", "N/A", "N/A"];
  if (skillsBool) {
    skills = getSkills(game);
  }
  let challenges = ["N/A", "N/A", "N/A"];
  if (challengesBool) {
    challenges = getChallenges(challengeQty);
  }
  let special;
  if (specialBool) {
    special = getSpecial();
  }

  switch (output) {
    case "html":
      createHeader(game);
      createBody(karma, skills, challenges, special, game);
      break;
    case "console":
      console.clear();
      console.log("Generating build...");
      console.log(
        `${getColor(game)}` +
          `${getBuildForConsole(karma, skills, challenges, special)}`,
      );
      break;
    case "json":
      createJson(karma, skills, challenges, special, game);
      //create json file and output to dir?
      break;
  }
}

function getColor(game) {
  switch (game) {
    case "3":
      return green;
    case "nv":
      return orange;
  }
}
function getBuildForConsole(karma, skills, challenges, special) {
  if (karma == "") {
    karma = "N/A";
  }
  if (skills == []) {
    for (let x = 0; x < 3; x++) {
      skills.push("N/A");
    }
  }
  while (challenges.length < 3) {
    challenges.push("N/A");
  }
  if (special == undefined) {
    special = ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"];
  }

  let str = `  ${createTerminalFiller(58)}\n
  ${createTerminalFiller(58)}\n
  ${createTerminalFiller(9)}Strength: ${special[0]}${getSpaces(0, 68)}${createTerminalFiller(9)}\n
  ${createTerminalFiller(9)}Perception: ${special[1]}${getSpaces(0, 7)}Challenges           Skills               Karma${getSpaces(0, 12)}${createTerminalFiller(9)}\n
  ${createTerminalFiller(9)}Endurance: ${special[2]}${getSpaces(0, 8)}-------------       -------------       -------------      ${createTerminalFiller(9)}\n
  ${createTerminalFiller(9)}Charisma: ${special[3]}${getSpaces(0, 9)}${challenges[0]}${getSpaces(challenges[0].length)}${skills[0]}${getSpaces(skills[0].length)}${karma}${getSpaces(karma.length, 18)}${createTerminalFiller(9)}\n
  ${createTerminalFiller(9)}Intelligence: ${special[4]}${getSpaces(0, 5)}${challenges[1]}${getSpaces(challenges[1].length)}${skills[1]}${getSpaces(skills[1].length, 38)}${createTerminalFiller(9)}\n
  ${createTerminalFiller(9)}Agility: ${special[5]}${getSpaces(0, 10)}${challenges[2]}${getSpaces(challenges[2].length)}${skills[2]}${getSpaces(skills[2].length, 38)}${createTerminalFiller(9)}\n
  ${createTerminalFiller(9)}Luck: ${special[6]}${getSpaces(0, 72)}${createTerminalFiller(9)}\n
  ${createTerminalFiller(58)}\n
  ${createTerminalFiller(58)}\n
  `;
  return str;
}
function createHeader(game) {}
function createBody(karma, skills, challenges, special, game) {}

function createHTML() {
  return 3;
  //return new HTMLHtmlElement();
}

function getKarma() {
  let karmaType = "";
  let x = getRandomNumber(jsonData.karmaTypes.length);
  karmaType = jsonData.karmaTypes[x];
  return karmaType;
}

function getSkills(game) {
  let skills = [];
  let skillOptions = [];
  switch (game) {
    case "3":
      skillOptions = jsonData.falloutThreeSkills;
      break;
    case "nv":
      skillOptions = jsonData.falloutNewVegasSkills;
      break;
  }

  for (let x = 0; x < 3; x++) {
    var rand = getRandomNumber(skillOptions.length);
    skills.push(skillOptions[rand]);
    skillOptions.splice(rand, 1);
  }
  return skills;
}

function getSpecial() {
  let special = [1, 1, 1, 1, 1, 1, 1];
  let x = 0;
  while (x < 33) {
    let rand = getRandomNumber(7);
    if (special[rand] < 10) {
      special[rand]++;
      x++;
    }
  }
  return special;
}

function getChallenges(amount) {
  let challenges = [];
  let challengeTypes = getChallengeTypes();
  if (amount == 3) {
    challenges.push(
      jsonData.challenges.gameChanger[
        getRandomNumber(jsonData.challenges.gameChanger.entries.length)
      ],
    );
    challenges.push(
      jsonData.challenges.impactful[
        getRandomNumber(jsonData.challenges.impactful.entries.length)
      ],
    );
    challenges.push(
      jsonData.challenges.lowImpact[
        getRandomNumber(jsonData.challenges.lowImpact.entries.length)
      ],
    );
  } else if (amount == 2) {
    let getChall = [];
    let startChallenges = [];

    let randCat1 = getRandomNumber(challengeTypes.length);

    getChall.push(challengeTypes[randCat1]);
    challengeTypes.splice(randCat1, 1);

    getChall.push(challengeTypes[getRandomNumber(challengeTypes.length)]);

    startChallenges.push(jsonData.challenges[getChall[0]]);
    startChallenges.push(jsonData.challenges[getChall[1]]);

    for (let x = 0; x < 2; x++) {
      challenges.push(
        startChallenges[x][getRandomNumber(startChallenges[x].length)],
      );
    }
  } else if (amount == 1) {
    let getChall = [];
    let startChallenges = [];

    let randCat1 = getRandomNumber(challengeTypes.length);

    getChall.push(challengeTypes[randCat1]);
    startChallenges.push(jsonData.challenges[getChall[0]]);
    challenges.push(
      startChallenges[0][getRandomNumber(startChallenges[0].length)],
    );
  }
  return challenges;
}
function getChallengeTypes() {
  let arr = [];
  for (const key of Object.keys(jsonData.challenges)) {
    arr.push(key);
  }
  return arr;
}
function getArgsFromPy() {
  let karmaBool = process.argv[2].toLowerCase() == "true";
  let skillsBool = process.argv[3].toLowerCase() == "true";
  let challengesBool = process.argv[4].toLowerCase() == "true";
  let challengeQty = parseInt(process.argv[5]);
  let specialBool = process.argv[6].toLowerCase() == "true";
  let game = process.argv[7].toLowerCase();
  let output = process.argv[8].toLowerCase();

  return [
    karmaBool,
    skillsBool,
    challengesBool,
    challengeQty,
    specialBool,
    game,
    output,
  ];
}

function getRandomNumber(upper) {
  return Math.floor(Math.random() * upper);
}

function getSpaces(minusLength, spaceQty = 20) {
  let str = "";

  for (let x = 0; x < spaceQty - minusLength; x++) {
    str += " ";
  }
  //str = str.slice(0, str.length - length);
  return str;
}

function createTerminalFiller(size) {
  let str = "";
  for (let x = 0; x < size; x++) {
    str += fillerText[getRandomNumber(fillerText.length)];
    str += " ";
  }
  str += " ";
  return str;
}

function createJson(karma, skills, challenges, special, game) {
  const jsonObj = {
    karma: karma,
    skills: skills,
    challenges: challenges,
    special: special,
    game: game,
  };

  const json = JSON.stringify(jsonObj, null, 2);
  fs.writeFile("class.txt", json, function (err) {
    if (err) {
      console.log(err);
    }
  });
}
