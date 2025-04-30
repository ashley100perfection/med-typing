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

function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// Element references
const typingArea = document.getElementById("typing-area");
const phraseBox = document.getElementById("phrase-box");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let currentPhrase = "";
let currentIndex = 0;
let startTime = null;

// Load and render a new phrase
function loadPhrase() {
  currentPhrase = getRandomPhrase();
  renderPhrase(currentPhrase, "phrase-box");
  typingArea.value = "";
  wpmDisplay.textContent = "WPM: 0";
  accuracyDisplay.textContent = "Accuracy: 0%";
  currentIndex = 0;
  startTime = null;
}

// Render each character in a span
function renderPhrase(phrase, elementId) {
  const box = document.getElementById(elementId);
  box.innerHTML = "";
  phrase.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.id = `${elementId}-char-${index}`;
    box.appendChild(span);
  });
}

// Handle typing input
typingArea.addEventListener("input", () => {
  if (!startTime) startTime = new Date();

  const typed = typingArea.value;
  const elapsed = (new Date() - startTime) / 60000;
  const wordsTyped = typed.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / elapsed);

  let correctChars = 0;
  for (let i = 0; i < currentPhrase.length; i++) {
    const span = document.getElementById(`phrase-box-char-${i}`);
    if (i < typed.length) {
      if (typed[i] === currentPhrase[i]) {
        span.className = "correct";
        correctChars++;
      } else {
        span.className = "incorrect";
      }
    } else {
      span.className = "";
    }
  }

  const accuracy = Math.round((correctChars / typed.length) * 100);
  wpmDisplay.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${isNaN(accuracy) ? 0 : accuracy}%`;
});

// Restart button
restartBtn.addEventListener("click", loadPhrase);

// Tab switching logic
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
  document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add("active");
}

// Initial load
loadPhrase();

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add("active");
}
