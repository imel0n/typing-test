<template>
  <div class="main-container">
    <div class="page-header">Header</div>

    <div class="middle-container">
      <div class="nav-bar">Nav Bar</div>

      <div class="page-content">
        Content
        <router-view />
      </div>
    </div>

    <div class="page-footer">Footer</div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  background: paleturquoise;
  flex: 0.1;
}

.page-footer {
  background: orange;
  flex: 0.05;
}

.middle-container {
  display: flex;
  flex: 0.85;
}

.nav-bar {
  background: lightgreen;
  flex: 0.2;
}

.page-content {
  background: skyblue;
  flex: 0.8;
}
</style>
