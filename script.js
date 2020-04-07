const keyboardElements = {
  Backquote: ['tilde', '~', '`', 'ё', 'Ё'],
  Digit1: ['one', '1', '!', '1', '!'],
  Digit2: ['two', '2', '@', '2', '"'],
  Digit3: ['three', '3', '#', '3', '№'],
  Digit4: ['four', '4', '$', '4', ';'],
  Digit5: ['five', '5', '%', '5', '%'],
  Digit6: ['six', '6', '^', '6', ':'],
  Digit7: ['seven', '7', '&', '7', '?'],
  Digit8: ['eight', '8', '*', '8', '*'],
  Digit9: ['nine', '9', '(', '9', '('],
  Digit0: ['zero', '0', ')', '0', ')'],
  Minus: ['minus', '-', '_', '-', '_'],
  Equal: ['equal', '=', '+', '=', '+'],
  Backspace: ['backspace'],
  Tab: ['tab'],
  KeyQ: ['q', 'q', 'Q', 'й', 'Й'],
  KeyW: ['w', 'w', 'W', 'ц', 'Ц'],
  KeyE: ['e', 'e', 'E', 'у', 'У'],
  KeyR: ['r', 'r', 'R', 'к', 'К'],
  KeyT: ['t', 't', 'T', 'е', 'Е'],
  KeyY: ['y', 'y', 'Y', 'н', 'Н'],
  KeyU: ['u', 'u', 'U', 'г', 'Г'],
  KeyI: ['i', 'i', 'I', 'ш', 'Ш'],
  KeyO: ['o', 'o', 'O', 'щ', 'Щ'],
  KeyP: ['p', 'p', 'P', 'з', 'З'],
  BracketLeft: ['ha', '[', '{', 'х', 'Х'],
  BracketRight: ['strongSign', ']', '}', 'ъ', 'Ъ'],
  Backslash: ['slash', '\\', '|', '\\', '/'],
  Delete: ['del'],
  CapsLock: ['caps'],
  KeyA: ['a', 'a', 'A', 'ф', 'Ф'],
  KeyS: ['s', 's', 'S', 'ы', 'Ы'],
  KeyD: ['d', 'd', 'D', 'в', 'В'],
  KeyF: ['f', 'f', 'F', 'а', 'А'],
  KeyG: ['g', 'g', 'G', 'п', 'П'],
  KeyH: ['h', 'h', 'H', 'р', 'Р'],
  KeyJ: ['j', 'j', 'J', 'о', 'О'],
  KeyK: ['k', 'k', 'K', 'л', 'Л'],
  KeyL: ['l', 'l', 'L', 'д', 'Д'],
  Semicolon: ['colon', ';', ':', 'ж', 'Ж'],
  Quote: ['quotationMarks', "'", '"', 'э', 'Э'],
  Enter: ['enter', '\n', '\n', '\n', '\n'],
  ShiftLeft: ['shift'],
  KeyZ: ['z', 'z', 'Z', 'я', 'Я'],
  KeyX: ['x', 'x', 'X', 'ч', 'Ч'],
  KeyC: ['c', 'c', 'C', 'с', 'С'],
  KeyV: ['v', 'v', 'V', 'м', 'М'],
  KeyB: ['b', 'b', 'B', 'и', 'И'],
  KeyN: ['n', 'n', 'N', 'т', 'Т'],
  KeyM: ['m', 'm', 'M', 'ь', 'Ь'],
  Comma: ['comma', ',', '<', 'б', 'Б'],
  Period: ['point', '.', '>', 'ю', 'Ю'],
  Slash: ['questionMark', '/', '?', '.', ','],
  ArrowUp: ['arrowUp', '▲', '▲', '▲', '▲'],
  ShiftRight: ['rShift'],
  ControlLeft: ['ctrl'],
  MetaLeft: ['win'],
  AltLeft: ['alt'],
  Space: ['space', ' ', ' ', ' ', ' '],
  AltRight: ['rAlt'],
  ControlRight: ['rCtrl'],
  ArrowLeft: ['arrowLeft', '◄', '◄', '◄', '◄'],
  ArrowDown: ['arrowDown', '▼', '▼', '▼', '▼'],
  ArrowRight: ['arrowRight', '►', '►', '►', '►'],
};

if (sessionStorage.lang === undefined) sessionStorage.lang = 'ENG';
let lastPressButton = '';
let shiftCase = false;
let shiftCaseLeft = false;
let altCaseLeft = false;
let changeLangUpKeyFlag = false;
let capsLock = false;

function createVirtualKeyboard() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.body.append(wrapper);

  const textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  wrapper.append(textarea);

  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  wrapper.append(keyboard);

  const clearfix = document.createElement('div');
  clearfix.className = 'clearfix';
  keyboard.append(clearfix);

  keyboard.after("Shift + alt - change language");
}

createVirtualKeyboard();

const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.textarea');
const clearfix = document.querySelector('.clearfix');

class Button {
  constructor({ code, key, style }) {
    this.className = `button ${style}`;
    this.code = code;
    this.key = key;
  }

  buildButton() {
    const div = document.createElement('div');
    div.className = this.className;
    div.dataset.key = this.key;
    div.dataset.code = this.code;
    div.innerHTML = this.code;
    return div;
  }
}

function creatButton() {
  const ar = [];
  const arr = Object.keys(keyboardElements);
  arr.forEach((el) => {
    ar.push(
      new Button({
        code: el,
        key: keyboardElements[el][0],
        style: keyboardElements[el][0],
      })
    );
  });
  ar.forEach((el) => {
    keyboard.append(el.buildButton());
  });
}

creatButton();
showKey();
textarea.focus();

function showKey() {
  let arrValues = Object.values(keyboardElements);

  arrValues.forEach((element) => {
    if (element[0] === 'rShift') {
      document.querySelector('.rShift').after(clearfix);
    }
  });

  if (shiftCase === false && sessionStorage.lang === 'ENG') {
    arrValues.forEach((element) => {
      let a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
      } else if (element[1] !== undefined) {
        a.innerText = element[1];
      }
    });
  }

  if (shiftCase === true && sessionStorage.lang === 'ENG') {
    arrValues.forEach((element) => {
      let a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
      } else if (element[2] !== undefined) {
        a.innerText = element[2];
      }
    });
  }

  if (shiftCase === false && sessionStorage.lang === 'RUS') {
    arrValues.forEach((element) => {
      let a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
      } else if (element[3] !== undefined) {
        a.innerText = element[3];
      }
    });
  }

  if (shiftCase === true && sessionStorage.lang === 'RUS') {
    arrValues.forEach((element) => {
      let a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
      } else if (element[4] !== undefined) {
        a.innerText = element[4];
      }
    });
  }
}

keyboard.addEventListener('mousedown', function (event) {
  textarea.focus();
  if (event.target.classList[0] == 'keyboard') return;
  lastPressButton = event.target;
  setStyle(event.target, true);
  identifyKey(event.target.dataset, 'down');
  showKey();
});

keyboard.addEventListener('mouseup', function (event) {
  textarea.focus();
  if (event.target.dataset.code === 'CapsLock') return;
  removeLastPressButtonStyle();
  identifyKey(event.target.dataset, 'up');
  showKey();
});

document.addEventListener('keydown', function (event) {
  if (event.repeat) return;
  event.preventDefault();
  setStyle(document.querySelector(`.${keyboardElements[event.code][0]}`), true);
  identifyKey(event, 'down');
  checkLanguage();
  showKey();
});

document.addEventListener('keyup', function (event) {
  if (event.repeat) return;
  if (event.key == 'CapsLock') return;
  setStyle(
    document.querySelector(`.${keyboardElements[event.code][0]}`),
    false
  );
  identifyKey(event, 'up');
  checkLanguage();
  showKey();
});

function setStyle(code, bool) {
  if (bool) code.classList.add('active');
  else code.classList.remove('active');
}

function removeLastPressButtonStyle() {
  lastPressButton.classList.remove('active');
}

function identifyKey(event, updown) {
  if (event.code === 'ShiftLeft') {
    if (shiftCaseLeft) shiftCaseLeft = false;
    else shiftCaseLeft = true;
  }

  if (event.code === 'AltLeft') {
    if (altCaseLeft) altCaseLeft = false;
    else altCaseLeft = true;
  }
  if (event.code === 'CapsLock') {
    if (capsLock === true) {
      setStyle(
        document.querySelector(`.${keyboardElements[event.code][0]}`),
        false
      );
    }
    capsButtonIsPress();
  }

  if (event.key === 'shift' || event.key === 'rShift' || event.key === 'Shift') {
    capsButtonIsPress();
    return;
  }

  if (updown === 'down') {
    if (event.code === 'Tab') {
      tabCase();
    }

    if (event.code === 'Backspace') {
      backspaceButtonISPress();
    }

    if (event.code === 'Delete') {
      deleteButtonIsPress();
    }

    if (shiftCase === false && sessionStorage.lang === 'ENG') {
      if (keyboardElements[event.code][1] !== undefined) {
        printKeyCode(keyboardElements[event.code][1]);
      }
    }

    if (shiftCase === true && sessionStorage.lang === 'ENG') {
      if (keyboardElements[event.code][2] !== undefined) {
        printKeyCode(keyboardElements[event.code][2]);
      }
    }

    if (shiftCase === false && sessionStorage.lang === 'RUS') {
      if (keyboardElements[event.code][3] !== undefined) {
        printKeyCode(keyboardElements[event.code][3]);
      }
    }

    if (shiftCase === true && sessionStorage.lang === 'RUS') {
      if (keyboardElements[event.code][4] !== undefined) {
        printKeyCode(keyboardElements[event.code][4]);
      }
    }
  }
}

function capsButtonIsPress() {
  if (capsLock === true) capsLock = false;
  else capsLock = true;

  if (shiftCase === true) shiftCase = false;
  else shiftCase = true;
}

function deleteButtonIsPress() {
  let arr = textarea.value.split('');
  let position = textarea.selectionStart;
  arr.splice(position, 1);
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd = position;
}

function backspaceButtonISPress() {
  let arr = textarea.value.split('');
  let position = textarea.selectionStart;
  if (position === 0) return;
  arr.splice(position - 1, 1);
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd = position - 1;
}

function printKeyCode(key) {
  let arr = textarea.value.split('');
  let position = textarea.selectionStart;
  arr.splice(position, 0, key);
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd = position + 1;
}

function tabCase() {
  let arr = textarea.value.split('');
  let position = textarea.selectionStart;
  arr.splice(position, 0, '    ');
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd = position + 4;
}

function checkLanguage() {
  if (changeLangUpKeyFlag) {
    if (altCaseLeft === false && shiftCaseLeft === false) {
      changeLangUpKeyFlag = false;
      changeLanguage();
      showKey();
    }
  } else if (altCaseLeft === true && shiftCaseLeft === true) {
    changeLangUpKeyFlag = true;
  } else return;
}

function changeLanguage() {
  if (sessionStorage.lang === 'ENG') {
    sessionStorage.lang = 'RUS';
  } else {
    sessionStorage.lang = 'ENG';
  }
}
