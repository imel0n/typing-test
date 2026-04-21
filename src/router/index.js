import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from "@/components/AppLayout.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
