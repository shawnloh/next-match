'use client'
import {Member} from "@/generated/prisma/client";
import {Tab, Tabs} from "@heroui/tabs";
import {Key, useTransition} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import MemberCard from "@/app/members/MemberCard";
import LoadingComponent from "@/app/components/LoadingComponent";

type Props = {
    members: Member[]
    likeIds: string[]
}

export default function ListTabs({likeIds, members}: Props) {
    const searchParam = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()
    const tabs = [
        {'id': 'source', label: 'Members I have liked'},
        {'id': 'target', label: 'Members that liked me'},
        {'id': 'Mutual', label: 'Mutual Likes'},
    ]

    type TabItem = (typeof tabs)[number]

    const handleTabChange = (key: Key) => {
        startTransition(() => {
            const param = new URLSearchParams(searchParam)
            param.set("type", key.toString().toLowerCase())
            router.replace(`${pathname}?${param.toString()}`)
        })
    }
    return (
        <div className='flex w-full flex-col mt-10 gap-5'>
            <Tabs aria-label='like tabs' items={tabs} color='secondary' onSelectionChange={(key) => {
                handleTabChange(key)
            }}>
                {(item: TabItem) => (
                    <Tab key={item.id} title={item.label}>
                        {isPending ? (
                            <LoadingComponent/>
                        ) : (
                            <>
                                {members.length > 0 ? (
                                    <div className=' grid grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-8'>
                                        {members.map(member => (
                                            <MemberCard key={member.id} member={member} likeIds={likeIds}/>
                                        ))}
                                    </div>
                                ) : (<div>No members for this filter</div>)}
                            </>
                        )}

                    </Tab>
                )}
            </Tabs>
        </div>
    );
}
