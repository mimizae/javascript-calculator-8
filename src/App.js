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

    const customSeparatorPattern = /^\/\/(.+)\n(.*)$/; // 커스텀 구분자를 담는 패턴

    const match = text.match(customSeparatorPattern); // match 메서드를 활용해 패턴

    if (match) {
      const customSeparator = match[1]; // (.+), //와 \n 사이 커스텀 구분자 (;)
      text = match[2]; // (.*), 실제 숫자 문자열 부분 (1;2;3)
      separators = [customSeparator]; // 커스텀 구분자만 사용 (기본은 무시)
    }
    const newRegExp = new RegExp("[" + separators.join("") + "]"); // 구분자 배열을 새로운 정규식으로 생성해 split
    const separatedText = text.split(newRegExp);
  }
}

export default App;
