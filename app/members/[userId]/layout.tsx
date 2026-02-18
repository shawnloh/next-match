import React from "react";
import MemberSidebar from "@/app/members/MemberSidebar";
import {getMemberByUserId} from "@/app/actions/member-actions";
import {notFound} from "next/navigation";
import {Card} from "@heroui/card";

export default async function MembersLayout({children, params}: {
    children: React.ReactNode,
    params: Promise<{ userId: string }>
}) {
    const {userId} = await params
    const member = await getMemberByUserId(userId)

    if (!member)
        return notFound()

    return (
        <div className='grid grid-cols-12 gap-5 h-[80vh]'>
            <div className="col-span-3">
                <MemberSidebar member={member}/>
            </div>
            <div className="col-span-9">
                <Card className='w-full mt-10 h-[80vh]'>
                    {children}
                </Card>
            </div>
        </div>
    )
}