import {Navbar, NavbarContent} from "@heroui/navbar";
import NavLink from "@/app/components/navbar/NavLink";
import {NavBarBrand} from "@/app/components/navbar/NavbarBrand";
import {auth} from "@/app/auth";
import {UserMenu} from "@/app/components/navbar/UserMenu";
import Link from "next/link";
import {Button} from "@heroui/button";

export default async function TopNav() {
    const session = await auth()
    return (
        <Navbar
            maxWidth='xl'
            className='bg-gradient-to-r from-purple-400 to-purple-700 text-white'
            classNames={{
                item: ['text-xl', 'text-white', 'uppercase', 'data-[active=true]:text-yellow-300', 'data-[active=true]:font-bold'],
            }}
        >

            <NavBarBrand/>

            <NavbarContent justify='center'>
                <NavLink href='/members' label='Matches'/>
                <NavLink href='/lists' label='Lists'/>
                <NavLink href='/messages' label='Messages'/>
            </NavbarContent>
            <NavbarContent justify='end'>
                {session?.user ? <UserMenu user={session.user}/> : <>
                    <Link href='/login'><Button variant='bordered' className='text-white'>Login</Button></Link>
                    <Link href='/register'><Button variant='bordered' className='text-white'>Register</Button></Link>
                </>}
            </NavbarContent>
        </Navbar>
    )
}