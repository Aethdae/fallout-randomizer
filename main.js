const fs = require("fs");
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
  special = getSpecial(specialBool);

  switch (output) {
    case "html":
      createHTML(karma, skills, challenges, special, game);
      createCss();
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
      break;
    case "text":
      createText(karma, skills, challenges, special, game);
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

function getSpecial(specialBool) {
  if (specialBool) {
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
  } else {
    return ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A"];
  }
}

function getChallenges(amount) {
  let challenges = [];
  let challengeTypes = getChallengeTypes();
  if (amount == 3) {
    challenges.push(
      jsonData.challenges.gameChanger[
        getRandomNumber(jsonData.challenges.gameChanger.length)
      ],
    );
    challenges.push(
      jsonData.challenges.impactful[
        getRandomNumber(jsonData.challenges.impactful.length)
      ],
    );
    challenges.push(
      jsonData.challenges.lowImpact[
        getRandomNumber(jsonData.challenges.lowImpact.length)
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
  } else if (amount == 0) {
    return ["N/A", "N/A", "N/A"];
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
  fs.writeFile("build.json", json, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function createText(karma, skills, challenges, special, game) {
  let gameType = "";
  switch (game) {
    case "nv":
      gameType = "Fallout New Vegas";
      break;
    case "3":
      gameType = "Fallout 3";
      break;
  }
  const text = `# Random Build for ${gameType}\n\n# Karma:\n${karma}\n\n# Skills:\n${skills[0]}\n${skills[1]}\n${skills[2]}\n\n# Challenges:\n${challenges[0]}\n${challenges[1]}\n${challenges[2]}\n\n# SPECIAL:\nStrength: ${special[0]}\nPerception: ${special[1]}\nEndurance: ${special[2]}\nCharisma: ${special[3]}\nIntelligence: ${special[4]}\nAgility: ${special[5]}\nLuck: ${special[6]}`;
  fs.writeFile("build.txt", text, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function createHTML(karma, skills, challenges, special, game) {
  let gameType = "";
  switch (game) {
    case "nv":
      gameType = "Fallout New Vegas";
      break;
    case "3":
      gameType = "Fallout 3";
      break;
  }
  let htmlStr = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Random Build</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <h1 id="headerText">
        Random Fallout Build for <span id="header">${gameType}</span>
      </h1>
    </header>
    <main>
      <section class="classContainer">
        <div class="classCard" id="specialCard">
          <div class="cardHeader"><h2>Special</h2></div>
          <div class="cardList">
            <ul>
              <li id="strength">Strength: ${special[0]}</li>
              <li id="perception">Perception: ${special[1]}</li>
              <li id="endurance">Endurance: ${special[2]}</li>
              <li id="charisma">Charisma: ${special[3]}</li>
              <li id="intelligence">Intelligence: ${special[4]}</li>
              <li id="agility">Agility: ${special[5]}</li>
              <li id="luck">Luck: ${special[6]}</li>
            </ul>
          </div>
        </div>
        <div class="classCard" id="skillsCard">
          <div class="cardHeader"><h2>Skills</h2></div>
          <div class="cardList">
            <ul>
              <li id="skill-0">${skills[0]}</li>
              <li id="skill-1">${skills[1]}</li>
              <li id="skill-2">${skills[2]}</li>
            </ul>
          </div>
        </div>
        <div class="classCard" id="challengesCard">
          <div class="cardHeader"><h2>Challenges</h2></div>
          <div class="cardList">
            <ul>
              <li id="challenge-0">${challenges[0]}</li>
              <li id="challenge-1">${challenges[1]}</li>
              <li id="challenge-2">${challenges[2]}</li>
            </ul>
          </div>
        </div>
        <div class="classCard" id="karmaCard">
          <div class="cardHeader"><h2>Karma</h2></div>
          <div class="cardList">
            <ul>
              <li id="karma">${karma}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <div class="footer">
        <p>
          Made with
          <a href="https://github.com/Aethdae/fallout-randomizer"
            >Fallout Randomizer</a
          >
          - Aethdae
        </p>
      </div>
    </footer>
  </body>
</html>
`;

  fs.writeFile("build.html", htmlStr, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

function createCss() {
  let cssStr = `:root {
  --nV-color: rgb(255, 207, 74);
  --fo3-color: rgb(8, 252, 8);
}

* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background-color: #222;
}
li {
  list-style: none;
}

h1 {
  background-color: #666;
  text-align: center;
}

.classContainer {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 20px;
  margin-left: 10px;
}

.classCard {
  background-color: #111;
  color: var(--nV-color);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 240px;
  border-radius: 8px;
}

.cardList {
  background-color: #333;
  padding: 8px;
  border-radius: 4px;
  border: var(--nV-color) 2px solid;
  width: 60%;
  text-align: center;
}

.cardHeader {
  padding: 8px;
  background-color: #333;
  margin-bottom: 10px;
  border: var(--nV-color) 2px dotted;
  border-radius: 4px;
  width: 80%;
  text-align: center;
}

footer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-content: center;
  bottom: 0;
  width: 100%;
  background-color: #333;
}
footer p {
  text-align: center;
  display: block;
  color: var(--fo3-color);
  margin-top: 8px;
}
footer a:link {
  color: var(--nV-color);
}
`;

  fs.writeFile("style.css", cssStr, function (err) {
    if (err) {
      console.log(err);
    }
  });
}
