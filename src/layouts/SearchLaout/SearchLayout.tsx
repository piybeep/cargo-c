import { SearchHeader } from "@/modules";

export function SearchLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
		<SearchHeader/>
			{children}
		</>
	);
}