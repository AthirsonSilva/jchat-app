export function ChatMessages({ userData, chats }: { userData: any, chats: Array<any> }) {
	return (
		<div>
			<span className="text-2xl ml-8 font-bold text-zinc-100">
				Welcome to the public chatroom, <strong className="uppercase">{userData.username}</strong>!
			</span>
			<ul className="chat-messages overflow-y-scroll w-full">
				{chats.map((chat: any, index) => (
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
		</div>
	)
}