import { prisma } from "@/lib/prisma";
import NextAuth, { type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials || !credentials.username || !credentials.password){
                    return null;
                }

                
                const user = await prisma.tbluseraccounts.findUnique({
                    where: {
                        username: credentials.username,
                        is_active: true,
                    },
                });

                if(!user){
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, user.password);

                if(!isPasswordValid){
                    return null;
                }

                return {
                    id: user.useraccountid.toString(),
                    ...user
                };
            }
        }),
    ],
    pages:{
        signIn: '/login',
    },
    callbacks: {
        session: ({session, token}) => {
            console.log('session callback', {session, token});
            return {...session,
                user: {
                    ...session.user,
                    ...token    
                }
            };
        },
        jwt: ({token, user}) => {
            console.log('jwt callback', {token, user});

            if (user) {
                const u = user as unknown as any
                return {...token, ...user};
            }
            return token;
        },
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}