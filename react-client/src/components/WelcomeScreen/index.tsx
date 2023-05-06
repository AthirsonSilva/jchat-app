export function WelcomeScreen({ userData, handleUsername, registerUser }: any) {
	return (
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
	)
}