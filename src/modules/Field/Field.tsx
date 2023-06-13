import Map from "@/component/Map/Map";
import style from "./Field.module.scss";
import { useEffect } from "react";

export const Field = () => {
  return (
    <div className={style.field}>
      <Map />
    </div>
  );
};
