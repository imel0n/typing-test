<script setup>
import { ref } from "vue";
import restartIcon from "@/assets/restartIcon.png";
import { wordLists } from "@/assets/wordLists.js";

// #region displayLogic
// #endregion

// #region inputLogic
var inputContent = ref("");
const typingInput = ref(null);

function clearInput() {
  inputContent.value = "";
}

function handleSpace() {
  clearInput();
}
// #endregion

// #region timerLogic
var timeLeft = ref(60);
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
  timeLeft.value = 60;
}

function startCountdown() {
  if (timer != null) return;

  timer = setInterval(() => {
    timeLeft.value--;

    if (timeLeft.value <= 0) {
      clearInterval(timer);
      timer = null;
      timeLeft.value = 0;
    }
  }, 1000);
}
// #endregion

function handleNewTest() {
  clearInput();
  resetCountdown();
  typingInput.value.focus();
}
</script>

<template>
  <div class="typing-test-container">
    <div class="display-container"></div>
    <div class="input-container">
      <input
        type="text"
        class="typing-input"
        v-model="inputContent"
        ref="typingInput"
        @keydown="startCountdown()"
        @keydown.space.prevent="handleSpace()"
      />
      <div class="timer">{{ formatTime(timeLeft) }}</div>
      <button class="new-test-button" @click="handleNewTest()">
        <img class="button-img" :src="restartIcon" />
      </button>
    </div>
  </div>
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
  height: 120px;

  border-radius: 10px 10px 0 0;
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
