export function WelcomeScreen({ userData, handleUsername, registerUser }: any) {
	return (
		<div className="register w-1/3 flex flex-col rounded-md">
			<div className="mb-4">
				<h1 className="text-3xl font-bold text-zinc-100">Welcome to Zinc Chat</h1>
				<p className="text-zinc-100 text-md">Please enter your name to continue</p>
			</div>
			<div className="flex flex-row">
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
		</div>
	)
}