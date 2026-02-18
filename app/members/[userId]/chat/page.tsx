import {CardBody, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";

export default function ChatPage() {
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>Chat</CardHeader>
            <Divider/>
            <CardBody>
                Chat go here
            </CardBody>
        </>
    );
}
