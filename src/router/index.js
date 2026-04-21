import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from "@/components/AppLayout.vue";

import TypingTestView from "@/views/TypingTestView.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        component: TypingTestView,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
