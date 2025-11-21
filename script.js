// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const choices = document.querySelectorAll('.choice-grid div');
const picked = {};
const resultsBox = document.querySelector('#results');
const titleBox = document.querySelector('#result-title');
const descBox = document.querySelector('#result-description');
const restart = document.querySelector('#restart');

for (const choice of choices) {
  choice.addEventListener('click', choose);
}

function choose(event) {
  const box = event.currentTarget;
  const qid = box.dataset.questionId;
  const cid = box.dataset.choiceId;

  picked[qid] = cid;

  const group = document.querySelectorAll('[data-question-id="' + qid + '"]');

  for (const item of group) {
    if (item === box) {
      item.classList.add('selected');
      item.classList.remove('not-selected');
      item.querySelector('.checkbox').src = "images/checked.png";
    } else {
      item.classList.remove('selected');
      item.classList.add('not-selected');
      item.querySelector('.checkbox').src = "images/unchecked.png";
    }
  }

  if (picked.one && picked.two && picked.three) {
    showResult();
  }
}

function showResult() {
  const result = getFinal();
  const info = RESULTS_MAP[result];

  titleBox.textContent = info.title;
  descBox.textContent = info.contents;

  resultsBox.classList.remove('hidden');
  window.scrollTo(0, document.body.scrollHeight);

  for (const c of choices) {
    c.removeEventListener('click', choose);
  }
}

function getFinal() {
  const a = RESULTS_MAP[picked.one].id;
  const b = RESULTS_MAP[picked.two].id;
  const c = RESULTS_MAP[picked.three].id;

  const avg = Math.floor((a + b + c) / 3);

  for (const key in RESULTS_MAP) {
    if (RESULTS_MAP[key].id === avg) {
      return key;
    }
  }

  return picked.one;
}

restart.addEventListener('click', resetQuiz);

function resetQuiz() {
  for (const c of choices) {
    c.classList.remove('selected');
    c.classList.remove('not-selected');
    const checkbox = c.querySelector('.checkbox');
    if (checkbox) {
      checkbox.src = "images/unchecked.png";
    }
    c.addEventListener('click', choose);
  }

  for (const key in picked) {
    if (Object.prototype.hasOwnProperty.call(picked, key)) {
      delete picked[key];
    }
  }

  resultsBox.classList.add('hidden');
  titleBox.textContent = '';
  descBox.textContent = '';
  window.scrollTo(0, 0);

}

