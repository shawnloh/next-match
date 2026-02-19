"use client";
import {Member} from "@/generated/prisma/client";
import {Card, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import Link from "next/link";
import {calculateAge, transformImageUrl} from "@/app/lib/utils";
import LikeButton from "@/app/components/LikeButton";

type Props = {
    member: Member
    likeIds: string[]
}

export default function MemberCard({member, likeIds}: Props) {
    const hasLiked = likeIds.includes(member.userId)
    return (
        <Card fullWidth as={Link} href={`/members/${member.userId}`} className="member-card" isPressable>
            <Image isZoomed alt={member.name} width={300} src={transformImageUrl(member.image) || '/images/user.png'}
                   className='aspect-square object-cover'/>
            <div className='absolute top-3 right-3 z-50'>
                <LikeButton targetUserId={member.userId} hasLiked={hasLiked}/>
            </div>
            <CardFooter
                className='flex justify-start overflow-hidden absolute bottom-0 z-10 dark-gradient'
            >
                <div className='flex flex-col text-white'>
                    <span className="font-semibold">{member.name}, {calculateAge(member.dateOfBirth)}</span>
                    <span className="text-sm">{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    );
}
