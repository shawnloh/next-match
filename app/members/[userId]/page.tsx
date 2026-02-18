import {getMemberByUserId} from "@/app/actions/member-actions";
import {notFound} from "next/navigation";
import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";

export default async function MemberDetailedPage({params}: { params: Promise<{ userId: string }> }) {
    const {userId} = await params
    const member = await getMemberByUserId(userId)
    if (!member) {
        return notFound()
    }
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>Profile</CardHeader>
            <Divider/>
            <CardBody>
                {member.description}
            </CardBody>
        </>
    );
}
