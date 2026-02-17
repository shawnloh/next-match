import {Button} from "@heroui/button";
import Link from "next/link";
import {auth} from "@/app/auth";
import {UserMenu} from "@/app/components/navbar/UserMenu";

export async function TopRightNavBarItems() {
    const session = await auth()

    if (session?.user) {
        return <UserMenu user={session.user}/>
    }
    return (
        <>
            <Link href='/login'><Button variant='bordered' className='text-white'>Login</Button></Link>
            <Link href='/register'><Button variant='bordered' className='text-white'>Register</Button></Link>
        </>
    );
}
