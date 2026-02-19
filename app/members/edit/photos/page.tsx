import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";
import {getAuthUserId} from "@/app/actions/auth-actions";
import {getMemberByUserId, getMemberPhotosByUserId} from "@/app/actions/member-actions";
import {MemberPhotoUpload} from "@/app/members/edit/photos/MemberPhotoUpload";
import {MemberPhotos} from "@/app/components/MemberPhotos";

export default async function PhotosEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>Edit Profile</CardHeader>
            <Divider/>
            <CardBody>
                <MemberPhotoUpload/>
                <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image}/>
            </CardBody>
        </>
    );
}
