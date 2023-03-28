import { BaseLayout } from "@/layouts/BaseLayout";
import { ReactNode } from "react";

export default function Transport() {
	return (
		<main>
            Transport
		</main>
	);
}

Transport.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);