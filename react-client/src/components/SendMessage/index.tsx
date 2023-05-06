export function SendButton({ userData, tab, handleMessage, sendValue, sendPrivateValue }:
	{ userData: any, tab: string, handleMessage: any, sendValue: any, sendPrivateValue: any }
) {
	return (
		<div className="flex send-message w-full pr-96">
			<input type="text" className="input-message pl-6" placeholder={
				tab === "CHATROOM" ? `Send a public message to @everyone` : `Send a private message to @${tab}`
			} value={userData.message} onChange={handleMessage} />
			<button type="button" className="bg-zinc-200 text-zinc-950 rounded-xl ml-4" onClick={
				tab === "CHATROOM" ? sendValue : sendPrivateValue
			}>SEND</button>
		</div>

	)
}