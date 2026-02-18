"use client";
import {Member} from "@/generated/prisma/client";
import {Card, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import Link from "next/link";
import {calculateAge} from "@/app/lib/utils";

type Props = {
    member: Member
}

export default function MemberCard({member}: Props) {
    return (
        <Card fullWidth as={Link} href={`/members/${member.userId}`} className="member-card" isPressable>
            <Image isZoomed alt={member.name} width={300} src={member.image || '/images/user.png'}
                   className='aspect-square object-cover'/>
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
