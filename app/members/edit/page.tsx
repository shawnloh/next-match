import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";
import EditForm from "@/app/members/edit/EditForm";
import {getAuthUserId} from "@/app/actions/auth-actions";
import {getMemberByUserId} from "@/app/actions/member-actions";
import {notFound} from "next/navigation";

export default async function MemberDetailedPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    if (!member) return notFound()

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>Edit Profile</CardHeader>
            <Divider/>
            <CardBody>
                <EditForm member={member}/>
            </CardBody>
        </>
    );
}
