const specialKeys = ["Enter", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
const numberRegex = /^\-?\d*(?:\.\d)?$/;
const input = document.querySelector("#isPrimeInput");
const resultP = document.querySelector("#resultP");
// const debugParagraph = document.querySelector("#debugParagraph");

const isPrime = (num) => {
  if (num == "") {
    return "Please add a number to check"
  } else if (Number.isInteger(+num) && +num >= 0) {
    num = parseInt(num);
    if (num > 2) {
      const devidorMap = new Map();
      let devidor = 2;
      mainLoop: while (true) {
        let tempNum = Math.floor(num ** 0.5);
        while (devidor <= tempNum) {
          if (!(num % devidor)) {
            num /= devidor;
            if (devidorMap.has(devidor)) {
              devidorMap.set(devidor, devidorMap.get(devidor) + 1);
            } else {
              devidorMap.set(devidor, 1);
            }
            if (num > 1) {
              continue mainLoop
            } else {
              break
            }
          }
          devidor = devidor != 2 ? devidor + 2 : 3;
        }
        if (devidorMap.has(num)) {
          devidorMap.set(num, devidorMap.get(num) + 1);
        } else {
          devidorMap.set(num, 1);
        }
        break
      }
      const [, item1Value] = devidorMap.entries().next().value;
      if (devidorMap.size > 1 || item1Value != 1) {
        let result = "";
        for (const [key, value] of devidorMap) {
          result += `${key}${(value > 1 ? `<span class="power">${value}</span>` : "")} × `
        }
        result = result.slice(0, -3);
        return `✘Not Prime✘ → ${result}` 
      }
    } else if (num != 2) {
      return `${num} → ✘Not Prime✘ {by agreement}`
    }
  } else if (+num < 0) {
    return `${num} → ✘Not Prime✘ {-ve number}`
  } else {
    return `${num} → this is not even an integer number ☺`
  }
  return `${num} → ✔Prime`
};

input.addEventListener("keydown", e => {
  const curKey = e.key;
  // debugParagraph.innerHTML = curKey;
  if (curKey === "Enter") {
    console.time("calc");

    resultP.innerHTML = isPrime(input.value);

    console.timeEnd("calc");
    input.value = "";
  } else if (!(specialKeys.includes(curKey) || e.ctrlKey || e.metaKey)) {
    const cursorPosition = input.selectionStart;
    const newValue = input.value.slice(0, cursorPosition) + curKey + input.value.slice(cursorPosition);
    if (!numberRegex.test(newValue)) {
      e.preventDefault();

    } else {

    }
  }
});



function filterMyInput(value) {
  let final = "";
  value.split("").map(cur => {
    final += cur
    do {
      if (numberRegex.test(final)) {
        if (final === "" || final <= Number.MAX_SAFE_INTEGER) {
          break
        }
      } else {
        goBack++;
      }
      final = final.slice(0, -1);
    } while (true);
  });
  return final;
}

input.addEventListener("input", e => {
  const cursorPosition = input.selectionStart;
  let goBack = 0;
  if (input.value) {
    input.value = filterMyInput(input.value)
  }
  input.setSelectionRange(cursorPosition, cursorPosition - goBack);
});

input.addEventListener('paste', e => {
  e.preventDefault();

  const pasteData = e.clipboardData.getData('text');
  const input = e.target;
  const cursorPosition = input.selectionStart;


  const newValue = filterMyInput(input.value.slice(0, cursorPosition) + pasteData + input.value.slice(cursorPosition));

  input.value = newValue? newValue : input.value;

});
