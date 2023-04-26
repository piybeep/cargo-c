import { ReactNode } from "react";

import { Header, TransportConfig } from "@/modules";

export default function TransportConfigPage() {
    return (
        <main>
            <TransportConfig />
        </main>
    );
}

TransportConfigPage.getLayout = (page: ReactNode) => (
    <>
        <Header />
        {page}
    </>
);