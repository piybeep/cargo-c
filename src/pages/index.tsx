import { BaseLayout } from "@/layouts/BaseLayout";
import { ReactNode } from "react";

export default function Home() {
	return (
		<main>
			in dev
		</main>
	);
}

Home.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);