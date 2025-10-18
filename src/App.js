import { MissionUtils } from "@woowacourse/mission-utils";

// 계산기 로직이 들어올 곳
class App {
  async run() {
    // 1. MissionUtils.Console.readLineAsync()를 사용하여 사용자 입력을 받는다.
    const input = await MissionUtils.Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요. "
    );

    try {
      // 2. 입력받은 문자열을 계산하는 핵심 로직을 작성.
      //(여기에 커스텀 구분자 처리, 음수 예외 처리 등의 로직이 들어간다.)
      const result = this.calculate(input);

      // 3. MissionUtils.Console.print()를 사용하여 결과를 출력한다.
      MissionUtils.Console.print(`결과 : ${result}`);
    } catch (error) {
      // 4. 예외(음수 등)가 발생하면 오류 메시지를 출력한다.
      MissionUtils.Console.print(error.message);

      // 테스트 코드가 toThrow()를 예상하므로, 예외를 다시 던져서 애플리케이션을 종료한다.
      throw error;
    }
  }

  calculate(text) {
    if (!text) return 0; // 빈 문자열 처리
    let separators = [",", ":"]; // 기본 구분자 세트

    const misplacedPattern = /.+\/\/.+\n/; // 문자열 중간에 '//~\n'이 존재하는지 검사
    if (misplacedPattern.test(text)) {
      throw new Error(
        "[ERROR]: 커스텀 구분자 지정은 문자열 맨 앞 부분에서 해주세요."
      );
    }

    const customSeparatorPattern = /^\/\/(.+)\n(.*)$/; // 커스텀 구분자를 담는 패턴

    const match = text.match(customSeparatorPattern); // match 메서드를 활용해 커스텀 구분자가 뭔지 확인

    if (match) {
      const customSeparator = match[1].split(""); // (.+), 모든 문자를 각각 구분자로 취급
      const invalidSeparator = customSeparator.find((char) =>
        /[a-zA-Z가-힣\s]/.test(char)
      ); // 문자 및 공백을 커스텀 구분자 지정 부분에 포함 시켰는지 확인

      if (invalidSeparator) {
        throw new Error(
          "[ERROR]: 글자 및 공백은 커스텀 구분자로 지정할 수 없습니다."
        );
      }

      text = match[2]; // (.*), 실제 숫자 문자열 부분
      separators = separators.concat(customSeparator); // 커스텀 구분자 + 기본 구분자
    }
    const escapeSeparatorArr = separators.map((s) =>
      s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const newRegExp = new RegExp("[" + escapeSeparatorArr.join("") + "]"); // 구분자 배열을 새로운 정규식으로 생성해 split
    const separatedText = text.split(newRegExp);

    // 숫자만 추출
    const numbers = separatedText.map(Number).filter((n) => !isNaN(n));

    const sum = numbers.map(Number).reduce((acc, num) => acc + num, 0);
    return sum;
  }
}

export default App;
