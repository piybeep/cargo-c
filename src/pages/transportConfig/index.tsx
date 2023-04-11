import { ReactNode } from "react";

import { BaseLayout } from "@/layouts/BaseLayout";
import { TransportConfig } from "@/modules";

export default function TransportConfigPage() {
    return (
        <main>
            <TransportConfig />
        </main>
    );
}

TransportConfigPage.getLayout = (page: ReactNode) => (
    <BaseLayout>
        {page}
    </BaseLayout>
);