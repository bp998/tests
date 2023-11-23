const { program } = require("commander");
const readline = require("readline");
// const { log } = require("console");
const path = require("path");
const fs = require("fs").promises;
require("colors");

const DEFAULT_MAX_VALUE = 10;

program.option(
  "-f, --file [string]",
  "File for saving game results",
  "result.txt"
);

program.option("-m, --max-value [number]", "Max value", DEFAULT_MAX_VALUE);

// const variables = program.parse(process.argv).opts();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { file, maxValue } = program.parse(process.argv).opts();

const logFile = path.join(__dirname, file);
const logFileDir = path.dirname(logFile);
console.log(logFile, typeof logFile);
console.log(logFileDir);

let guesses = 0;
let playerName = "";
let numberToGuess = 0;

const max = maxValue ? parseInt(maxValue) : DEFAULT_MAX_VALUE;

const start = () => {
  numberToGuess = Math.floor(Math.random() * max) + 1;
  guesses = 0;
  //   rl.question("Jak masz na imie?\n");
  rl.question(
    "Jak masz na imie?\n".yellow + "Wpisz 'q' aby zakonczyc gre\n".red,
    (answer) => {
      if (answer === "q") {
        console.log("Koniec gry".red);
        rl.close();
        return;
      }
      console.log(`Welcome to the game! ${answer}\n`.green);
      playerName = answer;
      gameTick();
    }
  );
};

const gameTick = () => {
  console.log("Liczba do zgadniecia", numberToGuess);
  rl.question(`Wprowadz liczbe od 1 do ${max}\n`.yellow, async (value) => {
    guesses++;
    const parsedGuess = parseInt(value);
    if (parsedGuess === numberToGuess) {
      console.log("Gratulacje, wygrales!".green);
      console.log(`Zgadles za ${guesses} razem`.yellow);
      await logResult(playerName);
      start();
    } else {
      console.log("Niestety, nie tym razem".red);
      gameTick();
    }
  });
};

const logResult = async (playerName) => {
  try {
    await fs.appendFile(
      file,
      `${playerName} | ${new Date().toDateString()} - Zgadłeś za ${guesses} razem!\n`
    );
  } catch (err) {
    console.log("Nie udalo sie zapisac wyniku gry".red, err);
  }
};

fs.access(file)
  .catch(() => {
    console.log("File does not exist");
    fs.mkdir(logFileDir, { recursive: true });
  })
  .finally(() => {
    start();
  });
