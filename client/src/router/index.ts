import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/library",
      name: "Library",
      component: () => import("@/views/LibraryView.vue"),
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import("@/views/ChatView.vue"),
    },
    {
      path: "/history",
      name: "History",
      component: () => import("@/views/HistoryView.vue"),
    },
    {
      path: "/used-book",
      name: "UsedBook",
      component: () => import("@/views/UsedBookView.vue"),
    },
    {
      path: "/used-book/create",
      name: "UsedBookCreate",
      component: () => import("@/views/UsedBookCreateView.vue"),
    },
    {
      path: "/book",
      name: "book",
      component: () => import("@/views/BookDetailView.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/SearchView.vue"),
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("@/views/PaymentView.vue"),
    },
  ],
});

export default router;
