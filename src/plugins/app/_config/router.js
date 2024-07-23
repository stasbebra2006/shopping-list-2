import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
	{
		path: "",
		name: "Shopping List - List",
		component: () => import("@/plugins/lib@shopping-list/shopping-lists/shopping-lists.vue")
	},

	{
		path: "",
		name: "Shopping List - Detail",
		component: () => import("@/plugins/lib@shopping-list/shopping-list-detail/shopping-list-detail.vue")
	},

	{
		path: "/:catchAll(.*)",
		name: "Not Found",
		component: () => import("@/plugins/lib@shopping-list/shopping-lists/shopping-lists.vue")
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router