interface Plus { size: number; className: string; }

export enum MessageStatus {
	SENT = 'SENT',
	DELIVERED = 'DELIVERED',
	READ = 'READ'
}

export interface UserData {
	username: string;
	receiverName: string;
	connected: boolean;
	content: string;
}

export interface Message {
	content: string;
	date: string;
	senderName: string;
	receiverName: string;
	status: string;
}