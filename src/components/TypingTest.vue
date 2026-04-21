<template>
  <div class="typing-test-container">
    <div class="display-container"></div>
    <div class="input-container">
      <input class="typing-input" />
      <div class="timer">X:XX</div>
      <button class="new-test">New Test</button>
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
  height: 100px;

  border-radius: 10px 10px 0 0;
}

.input-container {
  background: #a6c8e7;

  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px;
}

.typing-input {
  width: 50%;
  height: 30px;
  font-size: large;
}

.timer {
  background: #3b4e5c;
  color: white;

  border-radius: 20;
}
</style>
