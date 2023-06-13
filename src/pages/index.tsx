import { BaseLayout } from "@/layouts/BaseLayout";
import { ProjectsList } from "@/modules";
import { ReactNode } from "react";

export default function Home() {
	return (
		<main>
			<ProjectsList/>
		</main>
	);
}

Home.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);