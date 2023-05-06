import { Repeat } from "lucide-react";

export function Navbar() {
	return (
		<nav style={{
			width: '75vw',
		}} className="bg-zinc-700 border-b border-zinc-800 shadow-xl px-6 py-1 flex justify-between fixed top-0 right-0">
			<div className="flex items-center gap-4">
				<div className="flex flex-col mb-4">
					<span className="text-4xl text-zinc-500">@</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Repeat size={24} />
			</div>
		</nav>
	)
}