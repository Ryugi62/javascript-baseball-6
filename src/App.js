import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  constructor() {
    this.isPlaying = false;
    this.isCorrect = false;
    this.computer = "";
    this.user = "";
    this.status = {
      strike: 0,
      ball: 0,
      out: 0,
    };

    this.init();
  }

  init() {
    this.isPlaying = true;
    this.isCorrect = false;
    this.status = {
      strike: 0,
      ball: 0,
      out: 0,
    };
  }

  play() {
    while (this.isPlaying) {
      this.computer = this.generateComputer();
      this.user = this.getInput();
    }
  }

  generateComputer() {
    const COMPUTER = [];
    const MIN = 1;
    const MAX = 9;

    while (COMPUTER.length < 3) {
      const NUMBER = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

      if (!COMPUTER.includes(NUMBER)) COMPUTER.push(NUMBER);
    }

    return COMPUTER.join("");
  }

  getInput() {
    const INPUT = MissionUtils.Console.readLineAsync();

    if (!this.isValidInput(INPUT)) throw new Error("Invalid Input");

    return INPUT;
  }

  isValidInput(INPUT) {
    return INPUT.length === 3 && Number.isInteger(INPUT);
  }
}
