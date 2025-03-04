import image from "../assets/images/empty-state.png";

const EmptyProductList = () => {
  return (
    <div className="h-full flex flex-col w-full justify-center items-center mx-auto align-middle">
      <div className="flex flex-col gap-8 items-center">
        <img src={image} height={"320"} width={"320"} />
        <h3>No items Selected, Please select an item from product List</h3>
      </div>
    </div>
  );
};

export default EmptyProductList;
