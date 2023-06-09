import { BaseLayout } from "@/layouts/BaseLayout";
import { VisualizationMenu } from "@/modules";
import { ReactNode } from "react";

export default function Visualization() {
	return (
		<main>
            Visualization
		</main>
	);
}

Visualization.getLayout = (page: ReactNode) => (
	<BaseLayout>
		{page}
	</BaseLayout>
);