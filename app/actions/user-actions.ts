'use server'

import {memberEditSchema, MemberEditSchema} from "@/app/lib/schemas/member-edit-schema";
import {Member} from "@/generated/prisma/client";
import {getAuthUserId} from "@/app/actions/auth-actions";
import {prisma} from "@/app/prisma";

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();
        const validated = memberEditSchema.safeParse(data)

        if (!validated.success) {
            return {
                status: 'error',
                error: validated.error.issues
            }
        }

        const {name, description, city, country} = validated.data
        const member = await prisma.member.update({
            data: {
                name,
                description,
                city,
                country
            },
            where: {
                userId
            }
        })
        return {status: 'success', data: member}
    } catch (error) {
        console.log(error)
        return {status: 'error', error: 'Something went wrong while updating profile'}
    }
}