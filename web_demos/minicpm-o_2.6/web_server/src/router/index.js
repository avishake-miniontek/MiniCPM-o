import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './menu';

// Create a routing instance that can be used by the Vue application
export const router = createRouter({
    // Create a hash history.
    history: createWebHistory(import.meta.env.BASE_URL),
    // Route list.
    routes: basicRoutes
});

// config router
// Configuring the Router
export function setupRouter(app) {
    app.use(router);
}
