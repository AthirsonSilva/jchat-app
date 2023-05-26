import { Main } from "./components/MainScreen";

export default function Page() {
	return (
		<div className="h-screen flex flex-col">
			<div className="flex flex-1 justify-between">
				<Main />
			</div>
		</div>
	)
}