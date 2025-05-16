import {createRouter, createWebHistory} from "vue-router";
import CommunityManagementComponent from "@/community/pages/community-management.component.vue";
import ConcertManagementComponent from "@/concerts/pages/concert-management.component.vue";
import LoginManamegent from "@/users/pages/login-manamegent.vue";
import RegisterManagement from "@/users/pages/register-management.vue";
import ConcertMapComponent from "@/concerts/pages/concert-map-component.vue";
import ProfileManagement from "@/users/pages/profile-management.vue";

const routes = [

    {   path: '/communities', name: 'communities', component: CommunityManagementComponent, meta: {title: 'Communities'}},
    {  path: '/',                      name: 'default',    redirect: {name: 'concerts'}},

    { path: '/concerts', name: 'concerts', component: ConcertManagementComponent, meta: {title: 'Concerts'}},
    { path: '/login', name: 'login', component: LoginManamegent, meta: { title: 'Login' } },
    { path: '/register', name: 'register', component: RegisterManagement, meta: { title: 'Register' } },
    { path: '/concerts-map', name: 'concerts-map', component: ConcertMapComponent, meta: {title: 'Concerts Map'} },
    { path: '/profile', name: 'profile', component: ProfileManagement, meta: {title: 'Profile'} },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'Pruebita';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;