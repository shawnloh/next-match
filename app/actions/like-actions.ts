'use server'

import {prisma} from "@/app/prisma";
import {getAuthUserId} from "@/app/actions/auth-actions";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    try {
        const userId = await getAuthUserId()
        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId
                }
            })
        }

    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function fetchCurrentUserLikeIds() {
    try {
        const userId = await getAuthUserId()
        const likeIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })
        return likeIds.map(like => like.targetUserId)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthUserId()
        if (type === 'source') {
            return await fetchSourceLikes(userId)
        }
        if (type === 'target') {
            return await fetchTargetLikes(userId)
        }
        if (type === 'mutual') {
            return await fetchMutualLikes(userId)
        }

    } catch (e) {
        console.log(e)
        throw e
    }
}

async function fetchSourceLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where: {
            sourceUserId: userId
        },
        select: {
            targetMember: true
        }
    })
    return sourceList.map(x => x.targetMember)
}

async function fetchTargetLikes(userId: string) {
    const targetList = await prisma.like.findMany({
        where: {
            targetUserId: userId
        },
        select: {
            sourceMember: true
        }
    })
    return targetList.map(x => x.sourceMember)
}

async function fetchMutualLikes(userId: string) {
    const likedUser = await prisma.like.findMany({
        where: {
            sourceUserId: userId
        },
        select: {
            targetUserId: true
        }
    })
    const likedIds = likedUser.map(x => x.targetUserId)

    const mutualList = await prisma.like.findMany({
        where: {
            AND: [
                {targetUserId: userId},
                {sourceUserId: {in: likedIds}}
            ]
        },
        select: {
            sourceMember: true
        }
    })
    return mutualList.map(x => x.sourceMember)
}