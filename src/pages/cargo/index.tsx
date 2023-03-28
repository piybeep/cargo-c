import { BaseLayout } from "@/layouts/BaseLayout";
import { ReactNode } from "react";

export default function Cargo() {
	return (
		<main>
            Cargo
		</main>
	);
}

Cargo.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);