import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/error/PageNotFound.jsx";
import AuthProvider from "./services/provider/AuthProvider.jsx";
import Header from "./component/nav/Header.jsx";
import AdminRoute from "./services/middleware/AdminRoute.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Articles from "./pages/article/Articles.jsx";
import AdminArticles from "./pages/admin/article/AdminArticles.jsx";
import AddArticle from "./pages/admin/article/AddArticle.jsx";
import UpdateArticle from "./pages/admin/article/UpdateArticle.jsx";
import Admin from "./pages/admin/Admin.jsx";
import BreadCrumbs from "./component/ui/misc/BreadCrumbs.jsx";
import AdminArticle from "./pages/admin/article/AdminArticle.jsx";
import Article from "./pages/article/Article.jsx";
import Categories from "./pages/category/Categories.jsx";
import SubcategoriesOfCategory from "./pages/category/SubcategoriesOfCategory.jsx";
import ArticlesOfSubcategory from "./pages/category/ArticlesOfSubcategory.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import UserRoute from "./services/middleware/UserRoute.jsx";
import User from "./pages/user/User.jsx";
import Layout from "./pages/user/Layout.jsx";
import Profile from "./pages/user/profile/Profile.jsx";
import SuccessPayment from "./pages/cart/SuccessPayment.jsx";
import AdminCategories from "./pages/admin/category/AdminCategories.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Articles/>}/>

                    <Route element={<AdminRoute/>}>
                        <Route path={"admin"} element={<AdminLayout/>}>
                            <Route index element={<Admin/>}/>
                            <Route path="articles/add" element={<AddArticle/>}/>
                            <Route path="articles" element={<AdminArticles/>}/>
                            <Route path="articles/:id/update" element={<UpdateArticle/>}/>
                            <Route path="articles/:id" element={<AdminArticle/>}/>

                            <Route path="categories" element={<AdminCategories/>}/>
                            {/*<Route path="categories/add" element={}/>*/}
                            {/*<Route path="categories/update/:id" element={}/>*/}
                        </Route>
                    </Route>

                    <Route element={<UserRoute/>}>
                        <Route path={"dashboard"} element={<Layout/>}>
                            <Route index element={<User/>}/>
                            <Route path="profile" element={<Profile/>}/>
                            {/*Add some route here for the user dashboard Paul*/}
                        </Route>
                    </Route>

                    <Route path="categories" element={<BreadCrumbs/>}>
                        <Route index element={<Categories/>}/>
                        <Route path=':category' element={<SubcategoriesOfCategory/>}/>
                        <Route path=':category/:subcategory' element={<ArticlesOfSubcategory/>}/>
                        <Route path=':category/:subcategory/:article' element={<Article/>}/>
                    </Route>

                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/payment-success" element={<SuccessPayment/>}/>

                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}


export default App;
