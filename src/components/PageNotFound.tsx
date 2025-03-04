import { useNavigate } from "react-router-dom";
import image from "../assets/images/404.png";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] flex flex-col justify-center bg-background">
      <div className="flex justify-center align-middle gap-4 flex-wrap">
        <img src={image} height={"220"} />
        <div className="flex flex-col gap-8">
          <h1 className="text-9xl">404</h1>
          <h3>UH OH! You're lost.</h3>
          <h6>Sorry, page not found.</h6>
          <button
            className="bg-primary p-4 rounded-lg text-onPrimary"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
