'use server'

import {messageSchema, MessageSchema} from "@/app/lib/schemas/message-schema";
import {Message} from "@/generated/prisma/client";
import {getAuthUserId} from "@/app/actions/auth-actions";
import {prisma} from "@/app/prisma";
import {ActionResult} from "@/app/types";
import {mapMessageToMessageDto} from "@/app/lib/mapping";

export async function createMessage(recipientUserId: string, data: MessageSchema): Promise<ActionResult<Message>> {
    try {
        const userId = await getAuthUserId()
        const validated = messageSchema.safeParse(data)
        if (!validated.success) {
            return {
                status: 'error',
                error: validated.error.issues
            }
        }

        const {text} = validated.data
        const message = await prisma.message.create({
            data: {
                text,
                senderId: userId,
                recipientId: recipientUserId
            }
        });
        return {
            status: 'success',
            data: message
        }
    } catch (e) {
        console.log(e)
        return {
            status: 'error',
            error: 'Failed to send message'
        }
    }

}

export async function getMessageThread(recipientUserId: string) {
    try {
        const userId = await getAuthUserId()
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        recipientId: recipientUserId,
                        senderDeleted: false
                    },
                    {
                        senderId: recipientUserId,
                        recipientId: userId,
                        recipientDeleted: false
                    }
                ]
            },
            orderBy: {
                created: 'asc'
            },
            select: {
                id: true,
                text: true,
                created: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        if (messages.length > 0) {
            await prisma.message.updateMany({
                where: {
                    senderId: recipientUserId,
                    recipientId: userId,
                    dateRead: null
                },
                data: {
                    dateRead: new Date()
                }
            })
        }
        return messages.map(message => mapMessageToMessageDto(message))
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function getMessageByContainer(container: string) {
    try {
        const userId = await getAuthUserId()
        const conditions = {
            [container === 'outbox' ? 'senderId' : 'recipientId']: userId,
            ...(container === 'outbox' ? {senderDeleted: false} : {recipientDeleted: false})
        }
        const messages = await prisma.message.findMany({
            where: conditions,
            orderBy: {
                created: 'desc'
            },
            select: {
                id: true,
                text: true,
                created: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        return messages.map(message => mapMessageToMessageDto(message))
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
    try {
        const selector = isOutbox ? 'senderDeleted' : 'recipientDeleted'
        const userId = await getAuthUserId()
        await prisma.message.update({
            where: {
                id: messageId
            },
            data: {
                [selector]: {set: true}
            }
        })

        return prisma.message.deleteMany({
            where: {
                OR: [
                    {
                        senderId: userId,
                        senderDeleted: true,
                        recipientDeleted: true
                    },
                    {
                        recipientId: userId,
                        senderDeleted: true,
                        recipientDeleted: true
                    }
                ]
            }
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}