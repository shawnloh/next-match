import ListTabs from "@/app/lists/ListTabs";
import {fetchCurrentUserLikeIds, fetchLikedMembers} from "@/app/actions/like-actions";

export default async function ListPage({searchParams}: { searchParams: Promise<{ type: string }> }) {
    const {type} = await searchParams;
    const likeIds = await fetchCurrentUserLikeIds();
    const members = await fetchLikedMembers(type);
    return (
        <>
            <ListTabs members={members || []} likeIds={likeIds}/>
        </>
    );
}
