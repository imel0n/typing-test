<template>
  <div class="typing-test-container">
    <div class="display-container"></div>
    <div class="input-container">
      <input type="text" class="typing-input" />
      <div class="timer">X:XX</div>
      <button class="new-test-button">New Test</button>
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
  font-size: 20px;

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
}
</style>
