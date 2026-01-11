// Uygulama route tanımları - Application route definitions
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, type JSX } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { FullPageLoader } from "@/components/FullPageLoader";

// Lazy-loaded sayfalar - Lazy-loaded pages
const UserList = lazy(() => import("@/features/users/pages/UserList"));
const UserDetail = lazy(() => import("@/features/users/pages/UserDetail"));
const UserForm = lazy(() => import("@/features/users/pages/UserForm"));
const ProductList = lazy(() => import("@/features/products/pages/ProductList"));
const ProductDetail = lazy(() => import("@/features/products/pages/ProductDetail"));
const ProductFormPage = lazy(() => import("@/features/products/pages/ProductFormPage"));

// Yükleme yedekleme özelliğiyle sayfaları sarar - Suspense wrapper Wraps pages with loading fallback
const withSuspense = (element: JSX.Element) => <Suspense fallback={<FullPageLoader tip='Loading page...' />}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: withSuspense(<UserList />),
      },
      {
        path: "/users/add",
        element: withSuspense(<UserForm />),
      },
      {
        path: "/users/:id/edit",
        element: withSuspense(<UserForm />),
      },
      {
        path: "/users/:id",
        element: withSuspense(<UserDetail />),
      },
      {
        path: "/products",
        element: withSuspense(<ProductList />),
      },
      {
        path: "/products/add",
        element: withSuspense(<ProductFormPage mode='add' />),
      },
      {
        path: "/products/:id/edit",
        element: withSuspense(<ProductFormPage mode='edit' />),
      },
      {
        path: "/products/:id",
        element: withSuspense(<ProductDetail />),
      },
    ],
  },
]);
