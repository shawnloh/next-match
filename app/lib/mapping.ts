import {formatShortDate} from "@/app/lib/utils";
import {MessageDto, MessageWithSenderRecipient} from "@/app/types";

export function mapMessageToMessageDto(message: MessageWithSenderRecipient): MessageDto {
    return {
        id: message.id,
        text: message.text,
        created: formatShortDate(message.created),
        dateRead: message.dateRead ? formatShortDate(message.dateRead) : null,
        senderId: message.sender?.userId,
        senderName: message.sender?.name,
        senderImage: message.sender?.image,
        recipientId: message.recipient?.userId,
        recipientName: message.recipient?.name,
        recipientImage: message.recipient?.image,
    }
}