import { UserData } from "@/@types/types";
import { useEffect, useState } from 'react';

export function SendButton({ userData, tab, handleMessage, sendValue, sendPrivateValue }:
	{ userData: UserData, tab: string, handleMessage: any, sendValue: any, sendPrivateValue: any }
) {
	const [inputPlaceholder, setInputPlaceholder] = useState("Send a public message to @everyone")

	const sendMsg = () => {
		if (userData.content !== "") {
			return tab === "CHATROOM" ? sendValue() : sendPrivateValue()
		}

		return setInputPlaceholder("Please enter a message first before sending...")
	}

	const checkContent = () => {
		if (userData.content === "" || !userData.connected)
			return false

		return true
	}

	useEffect(() => {
		setInputPlaceholder(tab === "CHATROOM" ? `Send a public message to @everyone` : `Send a private message to @${tab}`)
	}, [tab])

	return (
		<div className="flex send-message w-full pr-96">
			<input type="text" className="h-10 input-message pl-6" placeholder={inputPlaceholder} value={userData.content} onChange={handleMessage} />
			<button style={{
				opacity: checkContent() ? 1 : 0.5,
				transition: "opacity 0.33s ease-in-out"
			}} disabled={!checkContent()} type="button" className="send-button bg-zinc-200 text-zinc-950 h-10 w-36 rounded-xl ml-4" onClick={sendMsg}>SEND</button>
		</div>

	)
}