"use server";
import {registerSchema, RegisterSchema} from "@/app/lib/schemas/register-schema";
import bcrypt from 'bcrypt'
import {prisma} from "@/app/prisma";
import {User} from "@/generated/prisma/client";
import {LoginSchema} from "@/app/lib/schemas/login-schema";
import {signIn, signOut} from "@/app/auth";
import {AuthError} from "next-auth";
import {redirect} from "next/navigation";

export async function signOutUser() {
    try {
        await signOut({redirect: false})
        redirect('/')
    } catch (error) {
        console.log(error)
        redirect('/')
    }
}

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        console.log(result)
        return {status: "success", data: "Logged in successfully"}
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        status: "error",
                        error: "Invalid email or password.",
                    }
                default:
                    return {
                        status: "error",
                        error: "An unexpected authentication error occurred. Please try again later."
                    }
            }
        }
        return {
            status: "error",
            error: "An unexpected error occurred. Please try again later."
        }
    }
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);
        if (!validated.success) {
            return {
                status: 'error',
                error: validated.error.issues,
            }
        }

        const {name, email, password} = validated.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({where: {email}});

        if (existingUser) {
            return {
                status: 'error',
                error: 'Email is already in use.',
            }
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
            },
        });
        return {
            status: 'success',
            data: user,
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return {
            status: 'error',
            error: 'An unexpected error occurred. Please try again later.',
        }
    }
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({where: {email}});
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({where: {id}});
}