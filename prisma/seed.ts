import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const roles = [
    {
      name : 'superadmin'
    },
    {
      name : 'writer'
    },
    {
      name : 'reader'
    }
  ]
  console.log(await prisma.roles.findMany())
  await prisma.roles.createMany({data: roles,skipDuplicates: true})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
