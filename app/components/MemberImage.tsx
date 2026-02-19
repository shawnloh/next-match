'use client'
import {Photo} from "@/generated/prisma/client";
import {CldImage} from "next-cloudinary";
import {Image} from "@heroui/image";
import {StarButton} from "@/app/components/StarButton";
import {DeleteButton} from "@/app/components/DeleteButton";

type Props = {
    photo: Photo | null
}

export default function MemberImage({photo}: Props) {
    return (
        <div>
            {photo?.publicId ? (
                <CldImage alt='image of member' src={photo.publicId} width={300} height={300} crop='fill' gravity='face'
                          className='rounded-2xl'/>
            ) : (
                <div className='relative'>
                    <Image width={220} src={photo?.url || '/images/user.png'} className='object-cover aspect-square'
                           alt='image of user'/>
                    <div className='absolute top-3 left-3 z-50'>
                        <StarButton selected={false} loading={false}/>
                    </div>
                    <div className='absolute top-3 right-3 z-50'>
                        <DeleteButton loading={false}/>
                    </div>
                </div>
            )}
        </div>
    )
}