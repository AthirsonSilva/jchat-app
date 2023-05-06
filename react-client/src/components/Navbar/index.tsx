import { Repeat } from "lucide-react";

export function Navbar() {
	return (
		<nav className="bg-zinc-700 border-b border-zinc-800 shadow-xl px-6 py-1 min-w-full flex justify-between fixed top-0">
			<div className="flex items-center">
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