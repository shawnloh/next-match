import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";
import {getAuthUserId} from "@/app/actions/auth-actions";
import {getMemberByUserId, getMemberPhotosByUserId} from "@/app/actions/member-actions";
import {MemberPhotos} from "@/app/components/MemberPhotos";
import {MemberPhotoUpload} from "@/app/members/edit/photos/MemberPhotoUpload";

export default async function PhotosEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div className='text-2xl font-semibold text-secondary'>Edit Profile</div>
                <MemberPhotoUpload/>
            </CardHeader>
            <Divider/>
            <CardBody>
                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image}/>
            </CardBody>
        </>
    );
}
