export default defineEventHandler(event => event.context.prisma.roles.findMany())
