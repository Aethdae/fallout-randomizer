console.log("Generating build...");

const doc = createHTML();
const jsonData = require("./data.json");
const green = "\x1b[32m";
const strSpacing = "                      ";
const perSpacing = "                    ";
const endSpacing = "                     ";
const chaSpacing = "                      ";
const intSpacing = "                  ";
const agiSpacing = "                        ";
const luckSpacing = "                            ";

startUp();

function startUp() {
  let args = getArgsFromPy();
  //console.log("args: " + args);
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

  let skills = [];
  if (skillsBool) {
    skills = getSkills(game);
  }
  let challenges = [];
  if (challengesBool) {
    challenges = getChallenges(challengeQty);
  }
  let special = [];
  if (specialBool) {
    special = getSpecial();
  }

  console.log(challenges, karma, skills, special);
  switch (output) {
    case "html":
      createHeader(game);
      createBody(
        karmaBool,
        skillsBool,
        challengesBool,
        challengeQty,
        specialBool,
        game,
      );
      console.log(
        karmaBool,
        skillsBool,
        challengesBool,
        challengeQty,
        specialBool,
        game,
      );
      break;
    case "console":
      console.log(
        green + `${getBuildForConsole(karma, skills, challenges, special)}`,
      );
      break;
    case "json":
      //create json file and output to dir?
      break;
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

  let str = `
  Strength: ${special[0]}${strSpacing} Challenges${strSpacing}Skills:\n
  Perception: ${special[1]}${perSpacing}-------------${intSpacing}-------------\n
  Endurance: ${special[2]}${endSpacing}${challenges[0]}${strSpacing}${skills[0]}\n
  Charisma: ${special[3]}${chaSpacing}${challenges[1]}${strSpacing}${skills[1]}\n
  Intelligence: ${special[4]}${intSpacing}${challenges[2]}${intSpacing}${skills[2]}\n
  Agility: ${special[5]}${agiSpacing}   Karma:${strSpacing}\n
  Luck: ${special[6]}${luckSpacing}   ${karma}
  `;
  return str;
}
function createHeader(game) {}
function createBody(
  karmaBool,
  skillsBool,
  challengesBool,
  challengeQty,
  specialBool,
  game,
) {}

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
  let specialBool = process.argv[6].toLowerCase == "true";
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
