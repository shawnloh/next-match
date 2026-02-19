'use client';
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@heroui/react";
import Link from "next/link";
import {signOutUser} from "@/app/actions/auth-actions";

type Props = {
    userInfo: { name: string | null, image: string | null } | null
}

export function UserMenu({userInfo}: Props) {
    console.log("========", userInfo)
    const handleSignOut = async () => {
        await signOutUser();
    };

    return (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name={userInfo?.name || 'user avatar'}
                    size='sm'
                    src={userInfo?.image || '/images/user.png'}
                />
            </DropdownTrigger>
            <DropdownMenu variant='flat' aria-label='User actions menu'>
                <DropdownSection showDivider>
                    <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'
                                  key='username'>
                        Signed in as {userInfo?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem as={Link} href='/members/edit' key='edit-profile'>
                    Edit Profile
                </DropdownItem>
                <DropdownItem color='danger' onPress={handleSignOut} key='sign-out'>
                    Log out
                </DropdownItem>
            </DropdownMenu>

        </Dropdown>
    );
}
