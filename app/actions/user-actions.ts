'use server'

import {memberEditSchema, MemberEditSchema} from "@/app/lib/schemas/member-edit-schema";
import {Member, Photo} from "@/generated/prisma/client";
import {getAuthUserId} from "@/app/actions/auth-actions";
import {prisma} from "@/app/prisma";
import {cloudinary} from "@/app/lib/cloudinary";

export async function updateMemberProfile(data: MemberEditSchema, nameUpdated: boolean): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();
        const validated = memberEditSchema.safeParse(data)

        if (!validated.success) {
            return {
                status: 'error',
                error: validated.error.issues
            }
        }

        if (nameUpdated) {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name: validated.data.name
                }
            })
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

export async function addImage(url: string, publicId: string) {
    try {
        const userId = await getAuthUserId();
        return prisma.member.update({
            where: {
                userId
            },
            data: {
                photos: {
                    create: [
                        {
                            url,
                            publicId
                        }
                    ]
                }
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong while adding image')
    }
}

export async function setMainImage(photo: Photo) {
    try {
        const userId = await getAuthUserId();
        return await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: userId
                },
                data: {image: photo.url}
            })
            return tx.member.update({
                where: {
                    userId
                },
                data: {image: photo.url}
            })
        })

    } catch (error) {
        console.log(error)
    }
}

export async function getUserInfoForNav() {
    try {
        const userId = await getAuthUserId();
        return await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                image: true
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteImage(photo: Photo) {
    try {
        const userId = await getAuthUserId();
        if (photo.publicId) {
            await cloudinary.v2.uploader.destroy(photo.publicId)
        }
        return await prisma.member.update({
            where: {
                userId
            },
            data: {
                photos: {
                    delete: {
                        id: photo.id
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong while deleting image')
    }
}