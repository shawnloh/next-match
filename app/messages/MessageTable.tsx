'use client';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {useRouter, useSearchParams} from "next/navigation";
import {MessageDto} from "@/app/types";
import {Key, useCallback, useState} from "react";
import {Card} from "@heroui/card";
import {Avatar} from "@heroui/react";
import {Button} from "@heroui/button";
import {AiFillDelete} from "react-icons/ai";
import {deleteMessage} from "@/app/actions/message-actions";
import {truncateText} from "@/app/lib/utils";

type Props = {
    messages: MessageDto[]
}

export function MessageTable({messages}: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isDeleting, setIsDeleting] = useState({id: '', loading: false})
    const isOutbox = searchParams.get('container') === 'outbox'
    const columns = [
        {key: isOutbox ? 'recipientName' : 'senderName', label: isOutbox ? 'Recipient' : 'Sender'},
        {key: 'text', label: 'Message'},
        {key: 'created', label: isOutbox ? 'Date sent' : 'Date received'},
        {key: 'actions', label: 'Actions'},
    ]

    const handleRowSelect = (key: Key) => {
        const message = messages.find(m => m.id === key)
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`
        router.push(url + '/chat')
    }

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setIsDeleting({id: message.id, loading: true})
        await deleteMessage(message.id, isOutbox)
        router.refresh()
        setIsDeleting({id: '', loading: false})
    }, [isOutbox, router])

    const renderCell = useCallback((item: MessageDto, columnKey: keyof MessageDto) => {
        const cellValue = item[columnKey]
        switch (columnKey) {
            case 'recipientName':
            case 'senderName':
                return <div
                    className='flex items-center gap-2 cursor-pointer'>
                    <Avatar alt='image of member'
                            src={(isOutbox ? item.recipientImage : item.senderImage) || '/images/user.png'}/>
                    <span>{cellValue}</span>
                </div>
            case 'text':
                return <div className='truncate'>
                    {truncateText(cellValue, 80)}
                </div>
            case 'created':
                return cellValue
            default:
                return (
                    <Button isIconOnly variant='light' onPress={() => handleDeleteMessage(item)}
                            isLoading={isDeleting.id === item.id && isDeleting.loading}>
                        <AiFillDelete size={24} className='text-danger'/>
                    </Button>
                )
        }
    }, [isOutbox, isDeleting.id, isDeleting.loading, handleDeleteMessage])


    return (
        <Card className='flex flex-col gap-3 h-[80vh] overflow-y-auto' shadow='none'>
            <Table aria-label="Message Table" selectionMode='single' onRowAction={handleRowSelect}>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}
                                              width={column.key === 'text' ? '50%' : undefined}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={messages}>
                    {(item) => (
                        <TableRow key={item.id} className='cursor-pointer'>
                            {(columnKey) => {
                                return <TableCell
                                    className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>{renderCell(item, columnKey as keyof MessageDto)}</TableCell>
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
