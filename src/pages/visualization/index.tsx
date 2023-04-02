import { BaseLayout } from "@/layouts/BaseLayout";
import { Field } from "@/modules";
import { ReactNode } from "react";

// styles
import style from "./Visualization.module.scss";

export default function Visualization() {
  return (
    <main className={style.main}>
      <Field />
    </main>
  );
}

Visualization.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
