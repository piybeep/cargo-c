import { ReactNode } from "react";
import { SearchLayout } from "@/layouts/SearchLaout";

import { TransportTemplate } from "@/modules";

export default function TransportTemplatePage() {
    return (
        <main>
            <TransportTemplate />
        </main>
    );
}

TransportTemplatePage.getLayout = (page: ReactNode) => (
    <SearchLayout>
        {page}
    </SearchLayout>
);