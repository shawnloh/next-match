import {Button} from "@heroui/button";
import {FaRegSmile} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1 className='text-3xl'>Hi</h1>
            <div>
                <Link href='/members'>
                    <Button color="primary" variant="bordered"
                            startContent={<FaRegSmile size={20}/>}>
                        Click me
                    </Button>
                </Link>
            </div>
        </>
    );
}
