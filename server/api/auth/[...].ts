import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { PrismaClient } from '@prisma/client'
import { verify } from 'argon2'
const prisma = new PrismaClient();
export default NuxtAuthHandler({
  // TODO: SET A STRONG SECRET, SEE https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler#secret
  secret: process.env.AUTH_SECRET,
  session:{
    strategy :'jwt'
  },
  // TODO: ADD YOUR OWN AUTHENTICATION PROVIDER HERE, READ THE DOCS FOR MORE: https://sidebase.io/nuxt-auth
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: '(hint: jsmith@mm.com)' },
        password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
      },

      async authorize (credentials: any) : Promise<Object> {
        console.warn('ATTENTION: You should replace this with your real providers or credential provider logic! The current setup is not safe')
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
        console.log(credentials)
        const user = await prisma.user.findUnique({where:{
          email : credentials.email
        }})

        // if (userError) {
        //   throw new Error("Username yang anda masukkan salah")
        // }
        console.log("user",user)
        if (!user) {
          throw  createError({
            statusCode: 403,
            statusMessage: "Email yang anda masukkan salah",
          });
        }

        const matchPassword = await verify(user.password,credentials.password)
        if (!matchPassword) {
          throw  createError({
            statusCode: 403,
            statusMessage: "Password yang anda masukkan salah",
          });
        }
        return user;

      }
    })
  ]
})
