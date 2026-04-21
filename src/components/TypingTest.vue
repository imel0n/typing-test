<script setup>
import { ref, onMounted, nextTick } from "vue";
import restartIcon from "@/assets/restartIcon.png";
import { wordLists } from "@/assets/wordLists.js";

// #region displayLogic
var wordList = wordLists.english1000;
var generationSize = 300;
const generatedWords = ref([]);
const generatedWordLengths = [];
var currentWordIdx = 0;
const currentWord = ref(null);

function generateWords() {
  const res = [];
  const lim = wordList.length;
  for (var i = 0; i < generationSize; i++) {
    const idx = Math.floor(Math.random() * lim);
    const word = wordList[idx];
    res.push(word);
    generatedWordLengths.push(word.length);
  }

  generatedWords.value = res;
  currentWordIdx = 0;
  currentWord.value = res[0];
}

const displayContainerRef = ref(null);

function handleScrollDisplay() {
  const displayContainer = displayContainerRef.value;
  const activeWordWrapper = displayContainer.querySelector(
    ".word-wrapper.is-active",
  );

  displayContainer.scrollTo({
    top: activeWordWrapper.offsetTop - displayContainer.offsetTop - 14,
    left: 0,
  });
}

function scrollDisplayToTop() {
  const displayContainer = displayContainerRef.value;
  displayContainer.scrollTo({ top: 0, left: 0 });
}
// #endregion

// #region inputLogic
var inputContent = ref("");
const typingInputRef = ref(null);
const typingOutputResults = ref([]);
const currentlyCorrect = ref(true);

function clearInput() {
  inputContent.value = "";
}

function handleCheckCorrectness() {
  const cur = currentWord.value;
  const inp = inputContent.value;

  currentlyCorrect.value =
    inp.length <= cur.length ? cur.startsWith(inp) : false;
}

function handleKeyUp(event) {
  if (timer == null && /^[a-zA-Z]$/.test(event.key)) {
    startCountdown();
  }

  handleCheckCorrectness();
}

async function handleSpaceDown() {
  if (inputContent.value != "" && !isTestLocked) {
    advanceCurrentWord();
    clearInput();
    await nextTick();
    handleScrollDisplay();
  }

  clearInput();
}

function advanceCurrentWord() {
  currentlyCorrect.value = inputContent.value == currentWord.value;
  typingOutputResults.value.push(currentlyCorrect.value);
  if (currentlyCorrect.value == true) incrementCorrectCharacters();
  currentlyCorrect.value = true;

  if (currentWordIdx < generationSize) {
    currentWordIdx++;
    currentWord.value = generatedWords.value[currentWordIdx];
  }
}
// #endregion

// #region timerLogic
var testDuration = ref(60);
var timeLeft = ref(testDuration.value);
var timer = null;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const secsString = secs.toString().padStart(2, "0");
  return `${mins}:${secsString}`;
}

function resetCountdown() {
  if (timer != null) clearInterval(timer);
  timer = null;
  timeLeft.value = testDuration.value;
}

function startCountdown() {
  if (timer != null) return;

  timer = setInterval(() => {
    timeLeft.value--;
    getWpm();

    if (timeLeft.value <= 0) {
      handleConcludeTest();

      clearInterval(timer);
      timer = null;
      timeLeft.value = 0;
    }
  }, 1000);
}
// #endregion

// #region testLogic
var correctCharacters = 0;
var currentWpm = 0;
var finalWpm = 0;
var isTestLocked = false;

async function handleNewTest() {
  resetTest();
  clearInput();
  resetCountdown();
  generateWords();

  isTestLocked = false;
  await nextTick();
  scrollDisplayToTop();
  typingInputRef.value.focus();
}

function incrementCorrectCharacters() {
  correctCharacters += generatedWordLengths[currentWordIdx] + 1;
}

function resetTest() {
  correctCharacters = 0;
  currentWpm = 0;
}

function getWpm() {
  currentWpm = Math.round(
    (correctCharacters * 60) / (testDuration.value - timeLeft.value) / 5,
  );
}

function handleConcludeTest() {
  isTestLocked = true;
  finalWpm = currentWpm;
}
// #endregion

// #region lifecycleHooks
onMounted(() => {
  handleNewTest();
});
// #endregion
</script>

<template>
  <div class="typing-test-container">
    <div
      :class="['display-container', { hidden: isTestLocked }]"
      ref="displayContainerRef"
    >
      <div
        v-for="(word, index) in generatedWords"
        :key="index"
        :class="[
          'word-wrapper',
          {
            'is-active': index === currentWordIdx,
            'is-incorrect': index === currentWordIdx && !currentlyCorrect,
            'was-correct':
              index < currentWordIdx && typingOutputResults[index] == true,
            'was-incorrect':
              index < currentWordIdx && typingOutputResults[index] == false,
          },
        ]"
      >
        {{ word }}
      </div>
    </div>
    <div class="input-container">
      <input
        type="text"
        class="typing-input"
        v-model="inputContent"
        ref="typingInputRef"
        @keyup="handleKeyUp"
        @keydown.space.prevent="handleSpaceDown"
      />
      <div class="timer">{{ formatTime(timeLeft) }}</div>
      <button class="new-test-button" @click="handleNewTest()">
        <img class="button-img" :src="restartIcon" />
      </button>
    </div>
  </div>
  <p>
    Correct characters: {{ correctCharacters }} | WPM: {{ currentWpm }} | Final
    WPM: {{ finalWpm }}
  </p>
</template>

<style scoped>
.typing-test-container {
  background: #baddfc;

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;

  padding: 10px;
  gap: 10px;
}

.display-container {
  background: white;
  height: 84px;
  border-radius: 10px 10px 0 0;
  max-width: 100%;

  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  padding: 12px;
  overflow: hidden;
}

.display-container.hidden {
  display: none;
}

.word-wrapper {
  font-size: 30px;
  height: 38px;
  font-family: "Times New Roman", serif;
  margin: 2px;
  padding: 0px 4px;
  border-radius: 5px;
}

.word-wrapper.is-active {
  background: lightgrey;
}

.word-wrapper.is-incorrect {
  background: red;
}

.word-wrapper.was-correct {
  color: green;
}

.word-wrapper.was-incorrect {
  color: red;
}

.input-container {
  background: #a6c8e7;

  border-radius: 0 0 10px 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}

.typing-input {
  width: 50%;
  font-size: 24px;
  height: 35px;
  font-family: "Times New Roman", serif;
}

.timer {
  background: #3b4e5c;
  color: white;
  font-size: 22px;

  height: 100%;
  border-radius: 5px;
  padding: 0px 10px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.new-test-button {
  height: 100%;
  border-radius: 5px;
  border: none;
  background: #428bca;
  color: white;
  cursor: pointer;
  padding: 15px;
}

.button-img {
  height: 100%;
}
</style>
