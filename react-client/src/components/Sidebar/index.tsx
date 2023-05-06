import { User } from "react-feather"
import { BsSpeedometer2 } from 'react-icons/bs'

export function Sidebar({ tab, setTab, privateChats }: { tab: string, setTab: any, privateChats: Map<any, any> }) {
	return (
		<aside className="w-96 bg-zinc-800 p-6">
			<input type="text" className="bg-zinc-700/50 rounded-md p-2 w-full text-sm font-semibold text-zinc-200" placeholder="Search" />
			<nav className="space-y-5 mt-10">
				<a href="" className="bg-zinc-200/40 rounded-md p-2 flex items-center gap-4 text-sm font-semibold text-zinc-200">
					<User size={32} />
					Friends
				</ a>
				<a href="" className="flex items-center gap-4 px-1 text-sm font-semibold text-zinc-200">
					<BsSpeedometer2 size={32} />
					Nitro
				</a>
			</nav>
			<nav className="mt-8 pt-8 border-t border-zinc-800 flex flex-col gap-2">
				<div>
					<h1 className="text-md text-white font-extrabold">DIRECT MESSAGES</h1>
				</div>
				<span onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</span>
				{[...privateChats.keys() as any].map((name, index) => (
					<span onClick={() => { setTab(name) }} className={`text-sm text-zinc-950 member ${tab === name && "active"}`} key={index}>{name}</span>
				))}
			</nav>
		</aside>
	)
}