<template>
  <div class="tr-main-container">
    <div class="tr-header">Result</div>
    <div class="tr-body">
      <div class="wpm-container">200 WPM</div>
      <div class="test-details"></div>
    </div>
  </div>
</template>

<style scoped>
.tr-main-container {
  background: var(--secondary-bg-colour);

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  max-width: 300px;

  padding: 10px;
  /* gap: 10px; */
}

.tr-header {
  background: var(--10ff-dark-blue);
  color: white;

  border-radius: 10px 10px 0 0;
  padding: 5px 10px;
  font-weight: bold;
}

.wpm-container {
  /* background: white; */
  color: #557b2b;

  text-align: center;
  font-weight: bold;
  font-size: 54px;
  padding: 5px;
}

.test-details {
  background: var(--primary-fg-colour);

  border-radius: 0 0 10px 10px;
  padding: 5px;
}
</style>
