import {CardInnerWrapper} from "@/app/components/CardInnerWrapper";
import {ChatForm} from "@/app/members/[userId]/chat/ChatForm";
import {getMessageThread} from "@/app/actions/message-actions";
import {MessageBox} from "@/app/members/[userId]/chat/MessageBox";
import {getAuthUserId} from "@/app/actions/auth-actions";

export default async function ChatPage({params}: { params: Promise<{ userId: string }> }) {
    const currentUserId = await getAuthUserId()
    const {userId} = await params
    const messages = await getMessageThread(userId)
    const body = (
        <div>
            {messages.length === 0 ? 'No messages yet' : messages.map(message => (
                <MessageBox key={message.id} message={message} currentUserId={currentUserId}/>
            ))}
        </div>
    )
    return (
        <CardInnerWrapper header='Chat' body={body} footer={<ChatForm/>}/>
    );
}
