import React, { useEffect } from "react";
import { useInformer } from "@/store/figure-types";

import { MapCargo } from "@/utils/map/createMap";

// styles
import style from "./Map.module.scss";

const Map = () => {
  // const figure = useInformer((state: any) => state.id);

  useEffect(() => {
    // Получить размеры canvas
    const width: number | undefined = document.querySelector(`.${style["canvas-field"]}`)?.clientWidth;
    const height: number | undefined = document.querySelector(`.${style["canvas-field"]}`)?.clientHeight;

    const settings = {
      width,
      height,
    };

    // Создание холста
    const field = new MapCargo(settings);
    field.create();
    // field.editor();
  }, []);

  return (
    <div className={style["canvas-field"]}>
      <canvas className={style.canvas} id="canvas"></canvas>
    </div>
  );
};

export default Map;
