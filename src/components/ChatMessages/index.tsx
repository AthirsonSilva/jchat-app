import { Message } from '@/@types/types'
import { useEffect, useState } from 'react'

export function ChatMessages({ userData, messages, room }: { userData: any, messages: Array<any>, room: string }) {
	const [chatMessages, setChatMessages] = useState<Array<Message>>([])

	const formatTime = (rawDate: string) => {
		const date = rawDate.slice(0, 10)
			.replace(/-/g, "/")
			.replace("T", " ")

		const hours = rawDate.slice(11, 13)
		const minutes = rawDate.slice(14, 16)
		const seconds = rawDate.slice(17, 19)

		return `${date} ${hours}:${minutes}:${seconds}`
	}

	const fetchPreviousMessages = async () => {
		const request = await fetch(`http://localhost:8080/api/v1/messages?room=${room === "CHATROOM" ? "public" : userData.username
			}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		const response = await request.json()

		console.table(response)

		setChatMessages(response)

		messages.forEach((message: any) => {
			chatMessages.push(message)
		})
	}

	useEffect(() => {
		fetchPreviousMessages()
	}, [messages, messages.length])

	return (
		<div className="mb-16">
			< span className="text-3xl italic ml-8 font-bold text-zinc-100" >
				{room === "CHATROOM" ?
					<>Welcome to the chatroom, <strong className="uppercase">{userData.username}</strong>!</>
					: `Private chat with ${room === userData.username ?
						"yourself"
						: room
					}`
				}
			</span >
			<ul className="chat-messages overflow-y-scroll w-full">
				{chatMessages.map((message: any, index) => (
					<li className={`message ${message.senderName === userData.username && "self"}`} key={index}>
						{message.senderName !== userData.username
							&& <div className="avatar uppercase text-left">
								{message.senderName} <small className="ml-6 mt-1 text-sm text-zinc-400">
									{formatTime(message.date)}
								</small>
							</div>
							|| <div className="avatar self uppercase text-left">
								{message.senderName} <small className="ml-6 mt-1 text-sm text-zinc-400">
									{formatTime(message.date)}
								</small>
							</div>
						}
						<div className="message-data">{message.content}</div>
					</li>
				))}
			</ul>
		</div >
	)
}