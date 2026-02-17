import 'dotenv/config'
import {membersData} from "./membersData";
import bcrypt from "bcrypt";
import {prisma} from '../app/prisma'


async function seedMembers() {
    await prisma.user.deleteMany()
    return membersData.map(async member => {
        await prisma.user.create(
            {
                data: {
                    email: member.email,
                    emailVerified: new Date(),
                    name: member.name,
                    passwordHash: await bcrypt.hash('password', 10),
                    image: member.image,
                    member: {
                        create: {
                            name: member.name,
                            dateOfBirth: new Date(member.dateOfBirth),
                            gender: member.gender,
                            created: new Date(member.created),
                            updated: new Date(member.lastActive),
                            description: member.description,
                            city: member.city,
                            country: member.country,
                            image: member.image,
                            photos: {
                                create: {
                                    url: member.image,
                                }
                            }
                        }
                    }
                }
            }
        )
    })
}

async function main() {
    await seedMembers()
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})