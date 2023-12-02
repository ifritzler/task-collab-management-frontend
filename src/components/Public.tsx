import { Link } from "react-router-dom";

const Public = () => {
  return (
    <>
      <h1>Homepage</h1>
      <Link to={"/login"}>Go to login page</Link>
    </>
  );
};

export default Public;
