import Authorization from "../page/public/Authorization"
import Catalog from "../page/public/Catalog"
import Product from "../page/public/Product"
import Home from "../page/public/Home"
import News from "../page/public/News"
import NewsDetailed from "../page/public/NewsDetailed"

import AdminMenu from "../page/admin/AdminMenu"


export const publicRoutes = [
    { path: '/auht', component: Authorization, exact: true },
    { path: '/', component: Home, exact: true },
    { path: '/catalog', component: Catalog, exact: true },
    { path: '/product', component: Product, exact: true },
    { path: '/news', component: News, exact: true },
    { path: '/news/:id', component: NewsDetailed, exact: true },
]

export const authRoutes = [
    { path: '/admin', component: AdminMenu, exact: true },
]