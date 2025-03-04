import { Outlet } from "react-router-dom";
import ProductList from "../components/ProductList";

const PrivateLayout = () => {
  return (
    <div className="bg-background lg:h-[100vh] scrollable flex flex-col lg:flex-row gap-4 p-4">
      <div className="bg-wrapperCard scrollable flex-grow p-4 rounded-2xl order-2 lg:order-1">
        <Outlet />
      </div>
      <div className="bg-wrapperCard max-h-[70vh] lg:max-h-[100vh] lg:h-full scrollable flex-shrink-0 lg:flex-shrink p-4 rounded-2xl order-1 lg:order-2 lg:w-product-list">
        <ProductList />
      </div>
    </div>
  );
};

export default PrivateLayout;
