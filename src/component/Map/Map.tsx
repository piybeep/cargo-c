import React, { useEffect } from "react";

// Карта
import { MapCargo } from "@/utils/map/createMap";

// Стили
import style from "./Map.module.scss";

// Данные
import { CARGOS } from "@/constants/cargos";

const Map = () => {
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
    field.arrange(CARGOS);
  }, []);

  return (
    <div className={style["canvas-field"]}>
      <canvas className={style.canvas} id="canvas"></canvas>
    </div>
  );
};

export default Map;
