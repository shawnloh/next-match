'use client'
import {Card, CardBody, CardHeader} from "@heroui/card";
import {GiPadlock} from "react-icons/gi";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useForm} from "react-hook-form";
import {registerSchema, RegisterSchema} from "@/app/lib/schemas/register-schema";
import {registerUser} from "@/app/actions/auth-actions";
import {zodResolver} from "@hookform/resolvers/zod";
import {handleFormServerError} from "@/app/lib/utils";

export default function RegisterForm() {
    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting},} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    })

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        if (result.status === 'success') {
            console.log("user registered")
        } else {
            handleFormServerError(result, setError)
        }
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
                        {errors.root?.serverError && (
                            <p className='text-danger text-sm'>{errors.root?.serverError.message}</p>
                        )}
                        <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color='secondary'
                                type='submit'>Register</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
