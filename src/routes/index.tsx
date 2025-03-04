import { lazy } from "react";

const PageNotFound = lazy(() => import("../components/PageNotFound"));
const PrivateLayout = lazy(() => import("../core/PrivateLayout"));
const ProductDetails = lazy(() => import("../components/ProductDetails"));
const EmptyProductList = lazy(() => import("../components/EmptyProductList"));

export const appRoutes: RouteProperties[] = [
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/",
        element: <EmptyProductList />,
      },
    ],
  },
];
