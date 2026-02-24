import { useEffect, useRef, useState } from "react";
import MainLogo from "../icons/main-logo";
import useSvgDraw from "../../utils/svg";
import { loader } from "../../utils/loader";

export default function Loader({ onFinish }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loader(onFinish);
  });

  return (
    <div className="loader-container">
      <div className="loader-container__content">
        <MainLogo />

        <h1>Le Carnet Gourmand</h1>
      </div>
    </div>
  );
}
