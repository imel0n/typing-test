<script setup>
import NavBar from "./NavBar.vue";
</script>

<template>
  <div class="main-container">
    <div class="page-header">Header</div>

    <div class="middle-container">
      <div class="nav-content">
        <NavBar />
      </div>

      <div class="page-content">
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
  background: var(--10ff-dark-blue);

  flex: 0.1;
}

.page-footer {
  display: none;
  background: var(--10ff-dark-blue);

  /* flex: 0.05; */
}

.middle-container {
  display: flex;
  flex: 0.9;
}

.nav-content {
  flex: 0.15;
  border-radius: 25px;
  margin: 20px 10px 20px 20px;
}

.page-content {
  flex: 0.85;
  margin: 20px 20px 20px 10px;
}
</style>
