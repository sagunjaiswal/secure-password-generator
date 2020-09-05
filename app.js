function getLowerLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getUpperLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getSymbol() {
  const symbols = "!@#$%^&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function getAmbigiousSymbol() {
  const ambiSymbols = "{}[]()/'`~,;:.<>";
  return ambiSymbols[Math.floor(Math.random() * ambiSymbols.length)];
}

function toastMessage() {
  var x = document.getElementById("toast");

  x.className = "show";

  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

const numbersElement = document.getElementById("numbers");
const clipboardElement = document.getElementById("clipboard");
const resultElement = document.getElementById("result");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const symbolsElement = document.getElementById("symbols");
const ambisymbolsElement = document.getElementById("ambiSymbols");
const generateElement = document.getElementById("generate");
const lengthElement = document.getElementById("length");

const data = {
  ambiSymbol: getAmbigiousSymbol,
  lower: getLowerLetter,
  upper: getUpperLetter,
  number: getNumber,
  symbol: getSymbol,
};

generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const isLower = lowercaseElement.checked;
  const isUpper = uppercaseElement.checked;
  const isNumber = numbersElement.checked;
  const isSymbol = symbolsElement.checked;
  const isAmbiSymbol = ambisymbolsElement.checked;
  resultElement.innerText = createPassword(
    isAmbiSymbol,
    isLower,
    isUpper,
    isNumber,
    isSymbol,
    length
  );
});

clipboardElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultElement.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});

function createPassword(ambiSymbol, lower, upper, number, symbol, length) {
  const optionsCount = ambiSymbol + lower + upper + number + symbol;
  if (optionsCount === 0) {
    return "";
  }
  let createdPassword = "";

  const optionsArray = [
    { ambiSymbol },
    { lower },
    { upper },
    { number },
    { symbol },
  ].filter((val) => Object.values(val)[0]);

  for (let i = 0; i < length; i += optionsCount) {
    optionsArray.forEach((option) => {
      const funcName = Object.keys(option)[0];

      createdPassword += data[funcName]();
    });
  }
  const finalPassword = createdPassword.slice(0, length);
  return finalPassword;
}
