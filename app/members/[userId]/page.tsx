import {getMemberByUserId} from "@/app/actions/member-actions";
import {notFound} from "next/navigation";

export default async function MemberDetailedPage({params}: { params: Promise<{ userId: string }> }) {
    const {userId} = await params
    const member = await getMemberByUserId(userId)
    if (!member) {
        return notFound()
    }
    return (
        <>Member page - {member?.name}</>
    );
}
