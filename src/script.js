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

const arrValues = Object.values(keyboardElements);

if (sessionStorage.lang === undefined) sessionStorage.lang = 'ENG';
let lastPressButton = '';
let shiftCase = false;
let shiftCaseLeft = false;
let altCaseLeft = false;
let changeLangUpKeyFlag = false;
let capsLock = false;
let keyboard = document.querySelector('.keyboard');
let textarea = document.querySelector('.textarea');
let clearfix = document.querySelector('.clearfix');

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

function createVirtualKeyboard() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  wrapper.append(textarea);

  keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  wrapper.append(keyboard);

  clearfix = document.createElement('div');
  clearfix.className = 'clearfix';
  keyboard.append(clearfix);

  document.body.append(wrapper);

  keyboard.after('Shift + alt - change language');
}

function creatButton() {
  const arr = Object.keys(keyboardElements);
  arr.forEach((el) => {
    const button = new Button({
      code: el,
      key: keyboardElements[el][0],
      style: keyboardElements[el][0],
    });
    keyboard.append(button.buildButton());
  });
}

function showKey() {
  document.querySelector('.rShift').after(clearfix);

  if (!shiftCase && sessionStorage.lang === 'ENG') {
    arrValues.forEach((element) => {
      const a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
        // empty
      } else if (element[1] !== undefined) {
        a.innerText = element[1];
      }
    });
  }

  if (shiftCase && sessionStorage.lang === 'ENG') {
    arrValues.forEach((element) => {
      const a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
        // empty
      } else if (element[2] !== undefined) {
        a.innerText = element[2];
      }
    });
  }

  if (!shiftCase && sessionStorage.lang === 'RUS') {
    arrValues.forEach((element) => {
      const a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
        // empty
      } else if (element[3] !== undefined) {
        a.innerText = element[3];
      }
    });
  }

  if (shiftCase && sessionStorage.lang === 'RUS') {
    arrValues.forEach((element) => {
      const a = document.querySelector(`.${element[0]}`);
      if (element.length < 2) {
        a.innerText = element[0];
      } else if (element[0] === 'enter') {
        // empty
      } else if (element[4] !== undefined) {
        a.innerText = element[4];
      }
    });
  }
}

function setStyle(code, bool) {
  if (bool) code.classList.add('active');
  else code.classList.remove('active');
}

function removeLastPressButtonStyle() {
  lastPressButton.classList.remove('active');
}

function capsButtonIsPress() {
  capsLock = !capsLock;
  shiftCase = !shiftCase;
}

function deleteButtonIsPress() {
  const arr = textarea.value.split('');
  const position = textarea.selectionStart;
  arr.splice(position, 1);
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd;
  textarea.selectionStart = position;
}

function backspaceButtonISPress() {
  const arr = textarea.value.split('');
  const position = textarea.selectionStart;
  if (position === 0) return;
  arr.splice(position - 1, 1);
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd;
  textarea.selectionStart = position - 1;
}

function printKeyCode(key) {
  const arr = textarea.value.split('');
  const position = textarea.selectionStart;
  arr.splice(position, 0, key);
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd;
  textarea.selectionStart = position + 1;
}

function tabCase() {
  const arr = textarea.value.split('');
  const position = textarea.selectionStart;
  arr.splice(position, 0, '    ');
  textarea.value = arr.join('');
  textarea.selectionStart = textarea.selectionEnd;
  textarea.selectionStart = position + 4;
}

function changeLanguage() {
  if (sessionStorage.lang === 'ENG') {
    sessionStorage.lang = 'RUS';
  } else {
    sessionStorage.lang = 'ENG';
  }
}

function checkLanguage() {
  if (changeLangUpKeyFlag) {
    if (!altCaseLeft && !shiftCaseLeft) {
      changeLangUpKeyFlag = !changeLangUpKeyFlag;
      changeLanguage();
      showKey();
    }
  } else if (altCaseLeft && shiftCaseLeft) {
    changeLangUpKeyFlag = !changeLangUpKeyFlag;
  }
}

function identifyKey(event, updown) {
  if (event.code === 'ShiftLeft') {
    shiftCaseLeft = !shiftCaseLeft;
  }

  if (event.code === 'AltLeft') {
    altCaseLeft = !altCaseLeft;
  }
  if (event.code === 'CapsLock') {
    if (capsLock) {
      setStyle(document.querySelector(`.${keyboardElements[event.code][0]}`), false);
    }
    capsButtonIsPress();
  }

  if (event.key === 'shift' || event.key === 'rShift' || event.key === 'Shift') {
    capsButtonIsPress();
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

    if (!shiftCase && sessionStorage.lang === 'ENG') {
      if (keyboardElements[event.code][1] !== undefined) {
        printKeyCode(keyboardElements[event.code][1]);
      }
    }

    if (shiftCase && sessionStorage.lang === 'ENG') {
      if (keyboardElements[event.code][2] !== undefined) {
        printKeyCode(keyboardElements[event.code][2]);
      }
    }

    if (!shiftCase && sessionStorage.lang === 'RUS') {
      if (keyboardElements[event.code][3] !== undefined) {
        printKeyCode(keyboardElements[event.code][3]);
      }
    }

    if (shiftCase && sessionStorage.lang === 'RUS') {
      if (keyboardElements[event.code][4] !== undefined) {
        printKeyCode(keyboardElements[event.code][4]);
      }
    }
  }
}

createVirtualKeyboard();
creatButton();
showKey();
textarea.focus();

keyboard.addEventListener('mousedown', (event) => {
  textarea.focus();
  if (event.target.classList[0] === 'keyboard') return;
  lastPressButton = event.target;
  setStyle(event.target, true);
  identifyKey(event.target.dataset, 'down');
  showKey();
});

keyboard.addEventListener('mouseup', (event) => {
  textarea.focus();
  if (event.target.dataset.code === 'CapsLock') return;
  removeLastPressButtonStyle();
  identifyKey(event.target.dataset, 'up');
  showKey();
});

document.addEventListener('keydown', (event) => {
  if (event.repeat) return;
  event.preventDefault();
  setStyle(document.querySelector(`.${keyboardElements[event.code][0]}`), true);
  identifyKey(event, 'down');
  checkLanguage();
  showKey();
});

document.addEventListener('keyup', (event) => {
  if (event.repeat) return;
  if (event.key === 'CapsLock') return;
  setStyle(document.querySelector(`.${keyboardElements[event.code][0]}`), false);
  identifyKey(event, 'up');
  checkLanguage();
  showKey();
});
