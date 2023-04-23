import { BaseLayout } from "@/layouts/BaseLayout";
import { ProjectsList } from "@/modules";
import { ReactNode, useState } from "react";

export default function Projects() {
	return (
		<main>
            <ProjectsList />
		</main>
	);
}

Projects.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);
