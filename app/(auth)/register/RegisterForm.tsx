'use client'
import {Card, CardBody, CardHeader} from "@heroui/card";
import {GiPadlock} from "react-icons/gi";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema, RegisterSchema} from "@/app/lib/schemas/register-schema";

export default function RegisterForm() {
    const {register, handleSubmit, formState: {errors, isValid},} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    })

    const onSubmit = (data: RegisterSchema) => {
        console.log(data)
    }

    return (
        <Card className='w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30}/>
                        <h1 className='text-3xl font-semibold'>Register</h1>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input label='Name' variant='bordered' {...register('name')}
                               isInvalid={!!errors.name}
                               errorMessage={errors.name?.message}/>
                        <Input label='Email' variant='bordered' {...register('email')}
                               isInvalid={!!errors.email}
                               errorMessage={errors.email?.message}/>
                        <Input label='Password' variant='bordered'
                               type='password' {...register('password')}
                               isInvalid={!!errors.password}
                               errorMessage={errors.password?.message}/>
                        <Button isDisabled={!isValid} fullWidth color='secondary' type='submit'>Login</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
