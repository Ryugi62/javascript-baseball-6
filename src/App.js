import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    // 게임 시작
    this.isPlaying = true; // 게임 플레이 여부
    this.isCollect = true; // 문제를 맞췄는지 여부
    this.computer = []; // 컴퓨터가 생성한 수
    this.user = []; // 사용자가 입력한 수
    this.status = {
      // 게임 상태
      strike: 0, // 스트라이크
      ball: 0, // 볼
      out: 0, // 아웃
    };

    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");

    while (this.isPlaying) {
      // 컴퓨터가 랜덤한 수 3개를 생성
      if (this.isCollect) this.computer = this.generateComputer();

      // 사용자가 3개의 수를 입력
      this.user = await this.inputUserNumbers();

      // 컴퓨터가 생성한 수와 사용자가 입력한 수를 비교
      this.isCollect = this.compareNumbers();

      this.showResult();

      // 문제를 맞췄다면 재시작 여부를 물어봄
      if (this.isCollect) {
        this.isPlaying = await this.restart();
      }
    }
  }

  generateComputer() {
    // 1 ~ 9 사이의 서로 다른 수 3개를 랜덤하게 생성
    const NUMBERS = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3); // 서로 다른 수 3개를 랜덤하게 생성

    return NUMBERS;
  }

  async inputUserNumbers() {
    const NUMBERS = await MissionUtils.Console.readLineAsync(
      "숫자를 입력해주세요 : "
    ).then((input) => input.split("").map((number) => parseInt(number)));

    if (NUMBERS.length !== 3) throw new Error("[ERROR]");

    return NUMBERS;
  }

  compareNumbers() {
    const COMPUTER = [...this.computer];
    const USER = [...this.user];

    // strike, ball, out 초기화
    this.clearStatus();

    // strike, ball, out 계산
    for (let i = 0; i < USER.length; i++) {
      if (COMPUTER[i] === USER[i]) {
        this.status.strike++;
        continue;
      }

      if (COMPUTER.includes(USER[i])) {
        this.status.ball++;
        continue;
      }

      this.status.out++;
    }

    return this.status.strike === 3;
  }

  clearStatus() {
    this.status = {
      strike: 0,
      ball: 0,
      out: 0,
    };
  }

  showResult() {
    const STRIKE = this.status.strike;
    const BALL = this.status.ball;
    const OUT = this.status.out;

    let message = "";
    message += BALL > 0 ? `${BALL}볼 ` : "";
    message += STRIKE > 0 ? `${STRIKE}스트라이크` : "";

    message = OUT === 3 ? "낫싱" : message;

    MissionUtils.Console.print(message);
  }

  async restart() {
    MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    MissionUtils.Console.print(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요."
    );
    const IS_RESTART = await MissionUtils.Console.readLineAsync("");

    if (IS_RESTART === "1") return true;
    if (IS_RESTART === "2") return false;

    throw new Error("[ERROR] 1 또는 2를 입력해주세요.");
  }
}

const app = new App();
app.play();

export default App;
