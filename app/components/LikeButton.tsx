import {useRouter} from "next/navigation";
import {toggleLikeMember} from "@/app/actions/like-actions";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import React from "react";

type Props = {
    targetUserId: string;
    hasLiked: boolean;
}

export default function LikeButton({hasLiked, targetUserId}: Props) {
    const router = useRouter()

    async function toggleLike(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        await toggleLikeMember(targetUserId, hasLiked)
        router.refresh()
    }

    return (
        <div onClick={toggleLike} className='relative cursor-pointer hover:opacity-80 transition'>
            <AiOutlineHeart size={28} className='fill-white absolute -top-0.5 -right-0.5'/>
            <AiFillHeart size={24} className={hasLiked ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
        </div>
    );
}
