'use client'
import {GoInbox} from "react-icons/go";
import {MdOutlineOutbox} from "react-icons/md";
import clsx from "clsx";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {Chip} from "@heroui/chip";

export function MessageSidebar() {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const [selected, setSelected] = useState<string>(searchParams.get('container') || 'inbox')

    const items = [
        {key: "inbox", label: 'Inbox', icon: GoInbox, chip: true},
        {key: "outbox", label: 'Outbox', icon: MdOutlineOutbox, chip: true},
    ]

    const handleSelect = (key: string) => {
        setSelected(key)
        const params = new URLSearchParams()
        params.set('container', key)
        router.replace(`${pathName}?${params.toString()}`)
    }

    return (
        <div className='flex flex-col shadow-md rounded-lg cursor-pointer'>
            {items.map(({key, icon: Icon, label, chip}) => (
                <div key={key} className={clsx('flex flex-row items-center rounded-t-lg gap-2 p-3', {
                    'text-secondary font-semibold': selected === key,
                    'text-black hover:text-secondary/70': selected !== key
                })} onClick={() => handleSelect(key)}>
                    <Icon size={24}/>
                    <div className='flex justify-between grow'>
                        <span>{label}</span>
                        {chip && <Chip>5</Chip>}
                    </div>
                </div>
            ))}

        </div>
    );
}
