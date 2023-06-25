import { hash } from "argon2"
export default defineEventHandler(async (event) => {
  const formData = await readBody(event)
  formData.password = await hash("password")
  await event.context.prisma.user.create({data:formData})
  return "Data user berhasil disimpan"
})
