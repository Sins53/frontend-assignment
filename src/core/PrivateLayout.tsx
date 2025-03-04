import { Outlet } from "react-router-dom";
import ProductList from "../components/ProductList";

const PrivateLayout = () => {
  return (
    <div className="bg-background h-[100vh] flex flex-col lg:flex-row gap-4 p-4">
      <div className="bg-wrapperCard scrollable flex-grow p-4 rounded-2xl order-2 lg:order-1">
        <Outlet />
      </div>
      <div className="bg-wrapperCard flex-shrink-0 lg:flex-shrink p-4 rounded-2xl order-1 lg:order-2 lg:w-product-list">
        <ProductList />
      </div>
    </div>
  );
};

export default PrivateLayout;
