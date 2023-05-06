import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

type randomAvatar = {
	avatar: string
}

export function Chatbar() {
	const [randomAvatars, setRandomAvatars] = useState<randomAvatar[]>([]);

	const generateRandomNames = () => {
		const randomAvatarList = [];

		for (let i = 0; i < 12; i++) {
			randomAvatarList.push({
				avatar: faker.image.avatar()
			});
		}

		setRandomAvatars(randomAvatarList);
	}

	useEffect(() => {
		generateRandomNames();
	}, []);

	return (
		<aside className="w-24 bg-zinc-900 p-6">
			<nav className="space-y-5 mt-10">
				<img src={require("../../assets/logo.png")} alt="" className="mt-16 w-14 h-8 rounded-full" />
				<hr className="border-zinc-400" />
				{randomAvatars.map((name, index) => (
					<a href="" className="rounded-md py-2 flex items-center gap-4 text-sm font-semibold" key={index}>
						<img src={name.avatar} alt="" className="w-10 h-10 rounded-full" />
					</a>
				))}
			</nav>
		</aside>
	)
}