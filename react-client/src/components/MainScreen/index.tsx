import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { Sidebar } from '../Sidebar';

let stompClient: any = null;

export function Main() {
	const [privateChats, setPrivateChats] = useState(new Map<any, any>());
	const [publicChats, setPublicChats] = useState([]);
	const [tab, setTab] = useState("CHATROOM");
	const [userData, setUserData] = useState({
		username: '',
		receiverName: '',
		connected: false,
		message: ''
	});

	useEffect(() => {
		console.log(userData);
	}, [userData]);

	const connect = () => {
		const Sock = new SockJS('http://localhost:8080/ws');
		stompClient = over(Sock);
		stompClient.connect({}, onConnected, onError);
	}

	const onConnected = () => {
		setUserData({ ...userData, "connected": true });
		stompClient.subscribe('/chatroom/public', onMessageReceived);
		stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
		userJoin();
	}

	const userJoin = () => {
		const chatMessage = {
			senderName: userData.username,
			status: "JOIN"
		};
		stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
	}

	const onMessageReceived = (payload: any) => {
		const payloadData = JSON.parse(payload.body);
		switch (payloadData.status) {
			case "JOIN":
				if (!privateChats.get(payloadData.senderName)) {
					privateChats.set(payloadData.senderName, []);
					setPrivateChats(new Map(privateChats));
				}
				break;
			case "MESSAGE":
				publicChats.push(payloadData as never);
				setPublicChats([...publicChats]);
				break;
		}
	}

	const onPrivateMessage = (payload: any) => {
		const payloadData = JSON.parse(payload.body);

		if (privateChats.get(payloadData.senderName)) {
			privateChats.get(payloadData.senderName).push(payloadData);
			setPrivateChats(new Map(privateChats));
		} else {
			const list = [];
			list.push(payloadData);
			privateChats.set(payloadData.senderName, list);
			setPrivateChats(new Map(privateChats));
		}
	}

	const onError = (err: any) => {
		console.error(err);
	}

	const handleMessage = (event: any) => {
		const { value } = event.target;
		setUserData({ ...userData, "message": value });
	}
	const sendValue = () => {
		if (stompClient) {
			const chatMessage = {
				senderName: userData.username,
				message: userData.message,
				status: "MESSAGE"
			};
			console.log(chatMessage);
			stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
			setUserData({ ...userData, "message": "" });
		}
	}

	const sendPrivateValue = () => {
		if (stompClient) {
			const chatMessage = {
				senderName: userData.username,
				receiverName: tab,
				message: userData.message,
				status: "MESSAGE"
			};

			if (userData.username !== tab) {
				privateChats.get(tab).push(chatMessage);
				setPrivateChats(new Map(privateChats));
			}
			stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
			setUserData({ ...userData, "message": "" });
		}
	}

	const handleUsername = (event: any) => {
		const { value } = event.target;
		setUserData({ ...userData, "username": value });
	}

	const registerUser = () => {
		connect();
	}

	return (
		<main className="bg-zinc-700 max-h-screen overflow-y-auto flex-1">
			<div className="flex flex-1 justify-between h-screen">
				<Sidebar
					tab={tab}
					setTab={setTab}
					privateChats={privateChats}
				/>
				<section className="mt-24 mx-4 max-h-full">
					{userData.connected ?
						<div style={{
							width: '75vw',
						}} className="mt-12 flex flex-auto">
							{tab === "CHATROOM" && <div className="w-full mx-10 ">
								<ul className="chat-messages">
									{publicChats.map((chat: any, index) => (
										<li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
											{chat.senderName !== userData.username
												&& <div className="avatar uppercase text-left">
													{chat.senderName} <small className="ml-6 mt-1 font-normal text-zinc-400">12/12/2002 16:20</small>
												</div>
												|| <div className="avatar self uppercase text-left">
													{chat.senderName} <small className="ml-6 mt-1 font-normal text-zinc-400">12/12/2002 16:20</small>
												</div>
											}
											<div className="message-data">{chat.message}</div>
										</li>
									))}
								</ul>
								<div className="send-message">
									<input type="text" className="input-message pl-6" placeholder={`Send a message to @everyone`} value={userData.message} onChange={handleMessage} />
									<button type="button" className="bg-zinc-200 text-zinc-950 rounded-xl ml-4" onClick={sendValue}>SEND</button>
								</div>
							</div>}
							{tab !== "CHATROOM" && <div className="chat-content">
								<div className="chat-messages">
									{[...privateChats.get(tab)].map((chat, index) => (
										<li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
											{chat.senderName !== userData.username
												&& <div className="avatar uppercase text-left">
													{chat.senderName} <small className="ml-6 mt-1 font-normal text-zinc-400">12/12/2002 16:20</small>
												</div>
												|| <div className="avatar self uppercase text-left">
													{chat.senderName} <small className="ml-6 mt-1 font-normal text-zinc-400">12/12/2002 16:20</small>
												</div>
											}
											<div className="message-data">{chat.message}</div>
										</li>
									))}
								</div>

								<div className="send-message">
									<input type="text" className="input-message pl-6" placeholder={`Send a message to @${tab}`} value={userData.message} onChange={handleMessage} />
									<button type="button" className="bg-zinc-200 text-zinc-950 rounded-xl ml-4" onClick={sendPrivateValue}>SEND</button>
								</div>
							</div>}
						</div>
						:
						<div className="register w-1/3 justify-between rounded-md">
							<input
								id="user-name"
								className='bg-zinc-100 shadow-2xl rounded-md w-full'
								placeholder="Enter your name"
								name="userName"
								value={userData.username}
								onChange={handleUsername}
							/>
							<button type="button" className="bg-zinc-600 ml-4 shadow-2xl rounded-md" onClick={registerUser}>
								CONNECT
							</button>
						</div>
					}
				</section>
			</div>
		</main >
	)
}