'use server';

import {prisma} from "@/app/prisma";
import {auth} from "@/app/auth";

export async function getMembers() {
    const session = await auth()
    if (!session?.user) {
        return null
    }
    try {
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session?.user?.id
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({
            where: {
                userId
            }
        })
    } catch (e) {
        console.log(e)
    }
}