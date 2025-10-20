export function validateCustomSeparatorPosition(text = "") {
  const misplacedPattern = /.+\/\/.+\n/;
  if (misplacedPattern.test(text)) {
    throw new Error(
      "[ERROR]: 커스텀 구분자 지정은 문자열 맨 앞 부분에서 해주세요."
    );
  }
}

export function validateCustomSeparators(customSeparator = []) {
  const invalidSeparator = customSeparator.find((char) =>
    /[a-zA-Z가-힣\s]/.test(char)
  );

  if (invalidSeparator) {
    throw new Error(
      "[ERROR]: 글자 및 공백은 커스텀 구분자로 지정할 수 없습니다."
    );
  }
}

export function validateNoNegatives(numbers = []) {
  const negatives = numbers.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error("[ERROR]: 음수는 입력할 수 없습니다.");
  }
}
