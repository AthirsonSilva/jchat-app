import { useState } from 'react'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'
import { Message, UserData } from '../../@types/types'
import { ChatMessages } from '../ChatMessages'
import { Chatbar } from '../Chatbar'
import { Navbar } from '../Navbar'
import { SendButton } from '../SendMessage'
import { Sidebar } from '../Sidebar'
import { WelcomeScreen } from '../WelcomeScreen'

let stompClient: any = null

export function Main() {
	const [privateChats, setPrivateChats] = useState(new Map<any, any>())
	const [publicChats, setPublicChats] = useState<Message[]>([])
	const [tab, setTab] = useState<string>("CHATROOM")
	const [userData, setUserData] = useState<UserData>({
		username: '',
		receiverName: '',
		connected: false,
		content: ''
	})

	const connect = () => {
		const Sock = new SockJS('http://localhost:8080/ws')

		stompClient = over(Sock)
		stompClient.connect({}, onConnected, onError)
	}

	const onConnected = () => {
		setUserData({ ...userData, "connected": true })

		stompClient.subscribe('/chatroom/public', onMessageReceived)
		stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage)

		userJoin()
	}

	const userJoin = () => {
		const chatMessage = {
			senderName: userData.username,
			status: "JOIN"
		}

		stompClient.send("/app/message", {}, JSON.stringify(chatMessage))
	}

	const onMessageReceived = (payload: any) => {
		const payloadData = JSON.parse(payload.body)

		switch (payloadData.status) {
			case "JOIN":
				if (!privateChats.get(payloadData.senderName)) {
					privateChats.set(payloadData.senderName, [])
					setPrivateChats(new Map(privateChats))
				}

				break

			case "MESSAGE":
				publicChats.push(payloadData as never)
				setPublicChats([...publicChats])
				break
		}
	}

	const onPrivateMessage = (payload: any) => {
		const payloadData = JSON.parse(payload.body)

		if (privateChats.get(payloadData.senderName)) {
			console.log("existing private chat")

			privateChats.get(payloadData.senderName).push(payloadData)
			setPrivateChats(new Map([...privateChats as any]))

			console.log("chat messages: ", privateChats.get(payloadData.senderName))
		} else {
			console.log("new private chat")

			const list = []
			list.push(payloadData)
			privateChats.set(payloadData.senderName, list)
			setPrivateChats(new Map(privateChats))
		}
	}

	const onError = (err: any) => {
		console.error(err)
	}

	const handleMessage = (event: any) => {
		const { value } = event.target
		setUserData({ ...userData, "content": value })
	}

	const sendValue = () => {
		if (stompClient) {
			const chatMessage = {
				senderName: userData.username,
				date: new Date().toISOString(),
				content: userData.content,
				status: "MESSAGE"
			}

			stompClient.send("/app/message", {}, JSON.stringify(chatMessage))
			setUserData({ ...userData, "content": "" })
		}
	}

	const sendPrivateValue = () => {
		if (stompClient) {
			const chatMessage = {
				senderName: userData.username,
				receiverName: tab,
				date: new Date().toISOString(),
				content: userData.content,
				status: "MESSAGE"
			}

			stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage))
			setUserData({ ...userData, "content": "" })
			onPrivateMessage({ body: JSON.stringify(chatMessage) })
		}
	}

	const handleUsername = (event: any) => {
		const { value } = event.target
		setUserData({ ...userData, "username": value })
	}

	const registerUser = () => {
		connect()
	}

	return (
		<main className="bg-zinc-700 max-h-screen overflow-y-auto flex-1">
			<div className="flex flex-1 justify-between h-screen">
				<Sidebar
					tab={tab}
					setTab={setTab}
					privateChats={privateChats}
				/>
				<section className="w-full flex flex-col">
					<div className="flex flex-1 justify-between">
						<Navbar />
					</div>
					{userData.connected ?
						<div className="flex flex-auto mt-12">
							{tab === "CHATROOM" && <div className="w-full mx-10 ">
								<ChatMessages
									messages={publicChats}
									userData={userData}
									room={tab}
								/>
							</div>}
							{tab !== "CHATROOM" && <div className="w-full mx-10">
								<ChatMessages
									messages={privateChats.get(tab)}
									userData={userData}
									room={tab}
								/>
							</div>}
							<SendButton
								tab={tab}
								userData={userData}
								handleMessage={handleMessage}
								sendValue={sendValue}
								sendPrivateValue={sendPrivateValue}
							/>
						</div>
						:
						<WelcomeScreen
							handleUsername={handleUsername}
							registerUser={registerUser}
							userData={userData}
						/>
					}
				</section>
				<Chatbar />
			</div>
		</main >
	)
}