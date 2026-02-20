import {getMemberByUserId} from "@/app/actions/member-actions";
import {notFound} from "next/navigation";
import {CardInnerWrapper} from "@/app/components/CardInnerWrapper";

export default async function MemberDetailedPage({params}: { params: Promise<{ userId: string }> }) {
    const {userId} = await params
    const member = await getMemberByUserId(userId)
    if (!member) {
        return notFound()
    }
    return (
        <>
            <CardInnerWrapper header='Profile' body={<div>{member.description}</div>}/>
        </>
    );
}
