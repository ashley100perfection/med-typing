const phrases = [
  "c/o SOB x2 days, no fever.",
  "PMHx: HTN, DM2, CKD stage 3.",
  "Allergies: NKDA.",
  "O/E: A&O x3, GCS 15.",
  "Vitals: BP 130/80, HR 88, RR 16.",
  "Plan: CBC, BMP, ECG stat.",
  "Administered 1L NS IV bolus.",
  "Pt denies CP, N/V, or dizziness.",
  "Pt reports palpitations and fatigue.",
  "ROS negative except as noted above.",
  "Dx: UTI vs. pyelonephritis. Tx: PO ABX x7d."
];

function getLongPhrase() {
  const shuffled = phrases.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).join(" "); // 3 phrases
}

// DOM elements
const typingArea = document.getElementById("typing-area");
const phraseBox = document.getElementById("phrase-box");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let currentPhrase = "";
let startTime = null;

function renderPhrase(phrase) {
  phraseBox.innerHTML = "";
  phrase.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.id = `char-${i}`;
    phraseBox.appendChild(span);
  });
}

function loadPhrase() {
  currentPhrase = getRandomPhrase();
  renderPhrase(currentPhrase);
  typingArea.value = "";
  wpmDisplay.textContent = "WPM: 0";
  accuracyDisplay.textContent = "Accuracy: 0%";
  startTime = null;
}

typingArea.addEventListener("input", () => {
  const typed = typingArea.value;
  if (!startTime && typed.length > 0) {
    startTime = new Date();
  }

  let correct = 0;

  for (let i = 0; i < currentPhrase.length; i++) {
    const charSpan = document.getElementById(`char-${i}`);
    if (i < typed.length) {
      if (typed[i] === currentPhrase[i]) {
        charSpan.className = "correct";
        correct++;
      } else {
        charSpan.className = "incorrect";
      }
    } else {
      charSpan.className = "";
    }
  }

  const elapsedMin = (new Date() - startTime) / 60000;
  const wpm = Math.round(typed.trim().split(/\s+/).length / elapsedMin);
  const accuracy = Math.round((correct / typed.length) * 100);

  wpmDisplay.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${isNaN(accuracy) ? 0 : accuracy}%`;
});

restartBtn.addEventListener("click", loadPhrase);

function showTab(tab) {
  const testTab = document.getElementById("test-mode");
  const lessonTab = document.getElementById("lesson-mode");
  const tabButtons = document.querySelectorAll(".tab-button");

  if (tab === "test") {
    testTab.classList.remove("hidden");
    lessonTab.classList.add("hidden");
  } else if (tab === "lesson") {
    lessonTab.classList.remove("hidden");
    testTab.classList.add("hidden");
  }

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.tab-button[onclick="showTab('${tab}')"]`)
    .classList.add("active");
}

let timer = null;
let timeLeft = 30;

function startTimer() {
  timeLeft = 30;
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      typingArea.disabled = true;
      calculateFinalStats();
    }
  }, 1000);
}

function calculateFinalStats() {
  const typed = typingArea.value;
  let correct = 0;

  for (let i = 0; i < typed.length && i < currentPhrase.length; i++) {
    if (typed[i] === currentPhrase[i]) {
      correct++;
    }
  }

  const words = typed.trim().split(/\s+/).length;
  const wpm = Math.round(words * 2); // since it's 30s test
  const accuracy = Math.round((correct / typed.length) * 100);

  wpmDisplay.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${isNaN(accuracy) ? 0 : accuracy}%`;
}

// Initial load
function loadPhrase() {
  currentPhrase = getLongPhrase();
  renderPhrase(currentPhrase);
  typingArea.value = "";
  typingArea.disabled = false;
  wpmDisplay.textContent = "WPM: 0";
  accuracyDisplay.textContent = "Accuracy: 0%";
  startTime = null;
  clearInterval(timer);
  startTimer();
}
