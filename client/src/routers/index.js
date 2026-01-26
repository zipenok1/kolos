import Authorization from "../page/public/Authorization"
import Catalog from "../page/public/Catalog"
import Product from "../page/public/Product"
import Home from "../page/public/Home"
import News from "../page/public/News"
import NewsDetailed from "../page/public/NewsDetailed"

import AdminMenu from "../page/admin/AdminMenu"
import AdminCatalog from '../page/admin/AdminCatalog'
import AdminProduct from '../page/admin/AdminProduct'
import AdminFeedback from '../page/admin/AdminFeedback'
import AdminNews from '../page/admin/AdminNews'
import AdminNewsletter from '../page/admin/AdminNewsletter'

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
    { path: '/admin/catalog', component: AdminCatalog, exact: true },
    { path: '/admin/product', component: AdminProduct, exact: true },
    { path: '/admin/feedback', component: AdminFeedback, exact: true },
    { path: '/admin/news', component: AdminNews, exact: true },
    { path: '/admin/newsletter', component: AdminNewsletter, exact: true }
]