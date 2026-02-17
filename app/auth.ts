import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from '@/app/prisma'
import Credential from "next-auth/providers/credentials";
import {loginSchema} from "@/app/lib/schemas/login-schema";
import {getUserByEmail} from "@/app/actions/auth-actions";
import bcrypt from "bcrypt";

export const {handlers: {GET, POST}, auth, signIn, signOut,} = NextAuth({
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: 'jwt'},
    providers: [Credential({
        name: 'Credentials',
        async authorize(credentials) {
            const validatedData = loginSchema.safeParse(credentials)
            if (!validatedData.success) {
                return null
            }
            const {email, password} = validatedData.data
            const user = await getUserByEmail(email)
            if (!user) {
                return null
            }
            const isValidPassword = await bcrypt.compare(password, user.passwordHash)
            if (!isValidPassword) {
                return null
            }
            return user
        }
    })],
})