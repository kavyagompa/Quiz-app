// ── Questions Data ──────────────────────────────────────────────────────────
const questions = [
  {
    topic: "Java",
    diff: "Beginner",
    q: "What does OOP stand for?",
    opts: ["Object Oriented Programming", "Open Operational Protocol", "Ordered Object Process", "Output Oriented Programming"],
    ans: 0,
    exp: "OOP stands for Object Oriented Programming. It is a programming style based on Classes and Objects."
  },
  {
    topic: "Java",
    diff: "Beginner",
    q: "Which keyword is used to create a class in Java?",
    opts: ["object", "define", "class", "struct"],
    ans: 2,
    exp: "The 'class' keyword defines a class in Java. Example: class Dog { }"
  },
  {
    topic: "Java",
    diff: "Beginner",
    q: "What is the correct way to print text in Java?",
    opts: ["print('Hello')", "echo 'Hello'", "System.out.println('Hello')", "console.log('Hello')"],
    ans: 2,
    exp: "System.out.println() is Java's built-in method to print text to the console."
  },
  {
    topic: "Java",
    diff: "Beginner",
    q: "What does 'inheritance' mean in OOP?",
    opts: ["A class copies another class's data", "A child class gets features of a parent class", "Two classes share the same file", "A class is deleted after use"],
    ans: 1,
    exp: "Inheritance lets a child class reuse fields and methods from a parent class using the 'extends' keyword."
  },
  {
    topic: "Java",
    diff: "Beginner",
    q: "Which of these is used to handle errors in Java?",
    opts: ["if/else block", "try/catch block", "for loop", "switch statement"],
    ans: 1,
    exp: "try/catch is used for Exception Handling in Java. Code that may fail goes in 'try', and the error is caught in 'catch'."
  },
  {
    topic: "Selenium",
    diff: "Beginner",
    q: "What is Selenium primarily used for?",
    opts: ["Building mobile apps", "Automating web browser testing", "Managing databases", "Writing backend Java programs"],
    ans: 1,
    exp: "Selenium automates web browser actions like clicking, typing, and verifying content — used for automated testing."
  },
  {
    topic: "Selenium",
    diff: "Beginner",
    q: "Which of these is a valid Selenium locator syntax?",
    opts: ["findByText()", "getElement()", "findElement(By.id('btn'))", "locate('button')"],
    ans: 2,
    exp: "findElement(By.id()) is correct Selenium syntax. Common locators: By.id, By.name, By.xpath, By.cssSelector."
  },
  {
    topic: "Selenium",
    diff: "Beginner",
    q: "What is the difference between Implicit and Explicit Wait?",
    opts: ["Implicit is faster", "Implicit applies globally; Explicit waits for a specific condition", "Explicit is for mobile only", "There is no difference"],
    ans: 1,
    exp: "Implicit Wait is a global timeout for all elements. Explicit Wait waits for a specific condition on a specific element."
  },
  {
    topic: "Testing",
    diff: "Beginner",
    q: "What is a test case?",
    opts: ["A Java class file", "Steps to test a feature with expected results", "A bug report", "A database query"],
    ans: 1,
    exp: "A test case is a set of steps, input data, and expected results used to verify a specific feature works correctly."
  },
  {
    topic: "TestNG",
    diff: "Beginner",
    q: "Which annotation marks a method as a test in TestNG?",
    opts: ["@Run", "@TestMethod", "@Test", "@Execute"],
    ans: 2,
    exp: "@Test is the core TestNG annotation. Any method with @Test will be picked up and executed as a test automatically."
  }
];

// ── State ───────────────────────────────────────────────────────────────────
let current  = 0;
let score    = 0;
let wrongs   = 0;
let answered = false;

// ── Load a Question ─────────────────────────────────────────────────────────
function loadQuestion() {
  const q = questions[current];

  // progress
  const pct = (current / questions.length) * 100;
  document.getElementById('prog').style.width = pct + '%';
  document.getElementById('prog-label').textContent = current + ' / ' + questions.length;

  // meta
  document.getElementById('qcount').textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
  document.getElementById('qtopic').textContent  = q.topic;
  document.getElementById('qdiff').textContent   = q.diff;
  document.getElementById('qtext').textContent   = q.q;

  // reset
  document.getElementById('feedback').className = 'feedback-box';
  document.getElementById('feedback').textContent = '';
  document.getElementById('nextbtn').classList.add('hidden');
  answered = false;

  // build options
  const grid = document.getElementById('opts');
  grid.innerHTML = '';
  q.opts.forEach(function(opt, i) {
    const btn = document.createElement('button');
    btn.className   = 'opt-btn';
    btn.textContent = opt;
    btn.onclick     = function() { pick(i); };
    grid.appendChild(btn);
  });
}

// ── Handle Answer Pick ───────────────────────────────────────────────────────
function pick(index) {
  if (answered) return;
  answered = true;

  const q    = questions[current];
  const btns = document.querySelectorAll('.opt-btn');
  const fb   = document.getElementById('feedback');

  // disable all buttons
  btns.forEach(function(b) { b.disabled = true; });

  if (index === q.ans) {
    score++;
    btns[index].classList.add('correct');
    fb.className     = 'feedback-box correct show';
    fb.textContent   = '✓ Correct! ' + q.exp;
  } else {
    wrongs++;
    btns[index].classList.add('wrong');
    btns[q.ans].classList.add('correct');
    fb.className     = 'feedback-box wrong show';
    fb.textContent   = '✗ Not quite. ' + q.exp;
  }

  document.getElementById('nextbtn').classList.remove('hidden');
}

// ── Next Question ────────────────────────────────────────────────────────────
function nextQ() {
  current++;
  if (current >= questions.length) {
    showScore();
  } else {
    loadQuestion();
  }
}

// ── Show Score Screen ────────────────────────────────────────────────────────
function showScore() {
  // complete progress bar
  document.getElementById('prog').style.width = '100%';
  document.getElementById('prog-label').textContent = '10 / 10';

  // hide quiz, show score
  document.getElementById('quiz-section').classList.add('hidden');
  document.getElementById('score-section').classList.remove('hidden');

  const pct = Math.round((score / questions.length) * 100);

  document.getElementById('scorebig').textContent  = score;
  document.getElementById('s-correct').textContent = score;
  document.getElementById('s-wrong').textContent   = wrongs;
  document.getElementById('s-pct').textContent     = pct + '%';

  // message based on score
  let msg = '';
  if (score <= 3) {
    msg = 'Keep going! Start with Java basics on Telusko (YouTube) and try again.';
  } else if (score <= 6) {
    msg = 'Good start! You know the basics. Review the concepts you missed and try again.';
  } else if (score <= 8) {
    msg = 'Nice work! Solid foundation. Keep building your Selenium and TestNG skills.';
  } else {
    msg = 'Excellent! You really know your stuff. You are well on your way to that first job!';
  }

  document.getElementById('scoremsg').textContent = msg;
}

// ── Restart ──────────────────────────────────────────────────────────────────
function restart() {
  current  = 0;
  score    = 0;
  wrongs   = 0;
  answered = false;

  document.getElementById('score-section').classList.add('hidden');
  document.getElementById('quiz-section').classList.remove('hidden');
  loadQuestion();
}

// ── Init ─────────────────────────────────────────────────────────────────────
loadQuestion();
