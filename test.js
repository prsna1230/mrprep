const exams = ["CGL", "CHSL", "MTS", "Steno", "GD", "CPO"];
const enteredExam = ["CGL", "CHSL"];

const result = enteredExam.every((exam) => {
  return exams.includes(exam);
});

console.log(result);
