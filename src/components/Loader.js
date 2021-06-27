import { Circle } from "better-react-spinkit";

const Loader = () => {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Circle color="#14a7f3" size={60} />
      </div>
    </center>
  );
};

export default Loader;
