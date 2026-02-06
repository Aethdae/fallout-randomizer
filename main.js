console.log("Starting up Node.js...");

const doc = createHTML();
const jsonData = require("./data.json");

startUp();

async function startUp() {
  let args = getArgsFromPy();
  console.log("args: " + args);
  createSite(args[0], args[1], args[2], args[3], args[4], args[5]);
}

function createSite(
  karmaBool,
  skillsBool,
  challengesBool,
  challengeQty,
  specialBool,
  game,
) {
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
}

function createHeader(game) {}
function createBody(
  karmaBool,
  skillsBool,
  challengesBool,
  challengeQty,
  specialBool,
  game,
) {
  let karma = getKarma();
  let skills = getSkills();
  let challenges = getChallenges(challengeQty);
  let special = getSpecial();

  console.log(challenges);
}

function createHTML() {
  return 3;
  //return new HTMLHtmlElement();
}

function getKarma() {
  let karmaType = "";
  return karmaType;
}

function getSkills() {
  let skills = [];
  return skills;
}

function getSpecial() {
  let special = [0, 0, 0, 0, 0, 0, 0];
  return special;
}

function getChallenges(amount) {
  let challenges = [];
  if (amount == 3) {
    challenges.push(
      jsonData.challenges.gameChanger[
        getRandomNumber(jsonData.challenges.gameChanger.entries.length)
      ],
    );
  } else if (amount == 2) {
  } else {
    console.log("1 challenge");
  }
  return challenges;
}

function getArgsFromPy() {
  let karmaBool = process.argv[2].toLowerCase() == "true";
  let skillsBool = process.argv[3].toLowerCase() == "true";
  let challengesBool = process.argv[4].toLowerCase() == "true";
  let challengeQty = parseInt(process.argv[5]);
  let specialBool = process.argv[6].toLowerCase == "true";
  let game = process.argv[7].toLowerCase();

  return [
    karmaBool,
    skillsBool,
    challengesBool,
    challengeQty,
    specialBool,
    game,
  ];
}

function getRandomNumber(upper) {
  return Math.floor(Math.random() * upper);
}
