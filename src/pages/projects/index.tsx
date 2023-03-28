import { BaseLayout } from "@/layouts/BaseLayout";
import { ReactNode } from "react";

export default function Projects() {
	return (
		<main>
            Projects
		</main>
	);
}

Projects.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);