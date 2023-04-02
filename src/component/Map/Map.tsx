import React, { useEffect } from "react";
import { useInformer } from "@/store/figure-types";

import { init, setColorBlock } from "@/utils/createMap";

// styles
import style from "./Map.module.scss";

const Map = () => {
  const figure = useInformer((state: any) => state.id);

  useEffect(() => {
    const width: number | undefined = document.querySelector(`.${style["canvas-field"]}`)?.clientWidth;
    const height: number | undefined = document.querySelector(`.${style["canvas-field"]}`)?.clientHeight;

    const settings = {
      width,
      height,
    };

    init(settings);
  }, []);

  useEffect(() => {
    setColorBlock(figure);
  }, [figure]);

  return (
    <div className={style["canvas-field"]}>
      <canvas className={style.canvas} id="canvas"></canvas>
    </div>
  );
};

export default Map;
