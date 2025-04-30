const phrases = [
  "Patient presents with acute abdominal pain.",
  "History of hypertension and type 2 diabetes.",
  "No known drug allergies.",
  "Vitals stable, afebrile.",
  "Plan: CBC, electrolytes, and ECG ordered.",
  "Chief complaint: chest pain radiating to the left arm.",
  "The patient is alert and oriented to person, place, and time.",
  "Discharged in stable condition with follow-up in 1 week.",
  "Past surgical history: laparoscopic cholecystectomy.",
  "Administered 500mL normal saline IV."
];

let currentPhrase = "";
let startTime;

const phraseBox = document.getElementById("phrase-box");
const typingArea = document.getElementById("typing-area");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

function getRandomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function loadPhrase() {
  currentPhrase = getRandomPhrase();
  phraseBox.textContent = currentPhrase;
  typingArea.value = "";
  wpmDisplay.textContent = "WPM: 0";
  accuracyDisplay.textContent = "Accuracy: 0%";
  startTime = null;
}

typingArea.addEventListener("input", () => {
  if (!startTime) {
    startTime = new Date();
  }

  const typed = typingArea.value;
  const elapsed = (new Date() - startTime) / 1000 / 60; // minutes
  const wordsTyped = typed.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / elapsed);

  const correctChars = typed.split("").filter((char, i) => char === currentPhrase[i]).length;
  const accuracy = Math.round((correctChars / currentPhrase.length) * 100);

  wpmDisplay.textContent = `WPM: ${isNaN(wpm) ? 0 : wpm}`;
  accuracyDisplay.textContent = `Accuracy: ${isNaN(accuracy) ? 0 : accuracy}%`;
});

restartBtn.addEventListener("click", loadPhrase);

// Initial load
loadPhrase();
