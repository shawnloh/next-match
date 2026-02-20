import {CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Divider} from "@heroui/react";
import {ReactNode} from "react";

type Props = {
    header: ReactNode | string;
    body: ReactNode;
    footer?: ReactNode;
}

export function CardInnerWrapper({header, body, footer}: Props) {
    return (
        <>
            <CardHeader>
                {typeof header === 'string' ? (
                    <div className='text-2xl font-semibold text-secondary'>
                        {header}
                    </div>
                ) : (
                    <>
                        {header}
                    </>
                )}
            </CardHeader>
            <Divider/>
            <CardBody>
                {body}
            </CardBody>
            {footer && (
                <CardFooter>
                    {footer}
                </CardFooter>
            )}
        </>
    );
}
