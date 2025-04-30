import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  borderColor: "rgb(7, 160, 129)",
  border: "9px solid rgb(7, 160, 129)",
};

const styleset = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
};

function Loader() {
  return (
    <div className="sweet" style={styleset}>
      <div>
        <ClipLoader
          loading={true}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
