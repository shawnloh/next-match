'use client'
import {ImageUploadButton} from "@/app/components/ImageUploadButton";
import {useRouter} from "next/navigation";
import {CloudinaryUploadWidgetResults} from "next-cloudinary";
import {addImage} from "@/app/actions/user-actions";
import {toast} from "react-toastify";

export function MemberPhotoUpload() {
    const router = useRouter()

    const onUploadSuccess = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object') {
            await addImage(result.info.secure_url, result.info.public_id)
            router.refresh()
        } else {
            toast.error("Something went wrong while uploading image")
        }
    }

    return (
        <div className="pt-5 pl-5">
            <ImageUploadButton onUploadImage={onUploadSuccess}/>
        </div>
    );
}
