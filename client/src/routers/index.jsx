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
import AdminLayout from '../components/AdminLayout'

export const publicRoutes = [
  { path: '/auth', element: <Authorization /> },
  { path: '/', element: <Home /> },
  { path: '/catalog', element: <Catalog /> },
  { path: '/product', element: <Product /> },
  { path: '/news', element: <News /> },
  { path: '/news/:id', element: <NewsDetailed /> }
]

const withAdminLayout = (Component) => (
  <AdminLayout>
    <Component />
  </AdminLayout>
)

export const authRoutes = [
  { path: '/admin', element: withAdminLayout(AdminMenu) },
  { path: '/admin/catalog', element: withAdminLayout(AdminCatalog) },
  { path: '/admin/product', element: withAdminLayout(AdminProduct) },
  { path: '/admin/feedback', element: withAdminLayout(AdminFeedback) },
  { path: '/admin/news', element: withAdminLayout(AdminNews) },
  { path: '/admin/newsletter', element: withAdminLayout(AdminNewsletter) }
];