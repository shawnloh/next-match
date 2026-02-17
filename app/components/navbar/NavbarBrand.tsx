'use client';
import Link from "next/link";
import {GiMatchTip} from "react-icons/gi";
import {NavbarBrand} from "@heroui/navbar";

export function NavBarBrand() {
    return (
        <NavbarBrand as={Link} href="/">
            <GiMatchTip size={40} className='text-gray-200'/>
            <div className='font-bold text-3xl flex'>
                <span className='text-gray-900'>Next</span>
                <span className='text-gray-200'>Match</span>
            </div>
        </NavbarBrand>
    );
}
