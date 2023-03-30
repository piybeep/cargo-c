import { BaseLayout } from "@/layouts/BaseLayout";
import { Field } from "@/modules";
import { ReactNode } from "react";

export default function Visualization() {
  return (
    <main>
      <Field />
    </main>
  );
}

Visualization.getLayout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
