import { BaseLayout } from "@/layouts/BaseLayout";
import { ReactNode } from "react";

import { Transport } from "@/modules";

export default function TransportPage() {
	return (
		<main>
			<Transport/>
		</main>
	);
}

TransportPage.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);