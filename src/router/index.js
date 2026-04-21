import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from "@/components/AppLayout.vue";

import BasicTestView from "@/views/BasicTestView.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        component: BasicTestView,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
