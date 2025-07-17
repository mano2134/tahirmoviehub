import { NavLink, useNavigate, useRouteError } from "react-router";

const PageError = () => {
  let navigate = useNavigate();
  let errorOfPage = useRouteError();
  console.log(errorOfPage);
  
  return (
    <div className="error-wrapper">
      <div className="error-content">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGNwbTU1dzhiZXc3YTQ3Zmo2OGU0dnZ3NGk0OGNmZTVrZHN2MmJpeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8L0Pky6C83SzkzU55a/giphy.webp"
          alt=""
        />

      <div className="btns">
            <button>
                <NavLink to={`/`}>Go to Home</NavLink>
            </button>
          <button onClick={() => navigate(-1)}>Go back</button>
      </div>
      </div>
    </div>
  );
};

export default PageError;
