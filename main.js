console.log("Starting up Node.js...");

startUp();

const doc = createHTML();
var jsonData;

async function startUp() {
  await getJson();
  let args = getArgsFromPy();
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

async function getJson() {
  try {
    const jsonUrl = require("./data.json");
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error(`HTTP Response: ${response.status}`);
    }
    console.log("response: " + response);
    const result = await response.json();
    console.log(result);
    jsonData = result;
  } catch (error) {
    console.error(error.message);
  }
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
