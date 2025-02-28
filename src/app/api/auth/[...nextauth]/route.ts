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

                const user = await prisma.tbluseraccounts.findFirst({
                    where: {
                        username: credentials.username,
                        is_active: true, // Ensure active status is checked
                    },
                    include: {
                        user: {
                            include: {
                                group1: true,
                                group2: true,
                                group3: true,
                            },
                        },
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
           
            return {...session,
                user: {
                    ...session.user,
                    ...token    
                }
            };
        },
        jwt: ({token, user}) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    useraccountid: u.id.toString(),
                    userid: u.user.userid.toString(),
                    username: u.username,
                    firstname: u.user.firstname,
                    lastname: u.user.lastname,
                    middlename: u.user.middlename,
                    extension: u.user.extension,
                    position: u.user.position,
                    group1name: u.user.group1 ? u.user.group1.group1name : null,
                    group2name: u.user.group2 ? u.user.group2.group2name : null,
                    group3name: u.user.group3 ? u.user.group3.group3name : null,
                };
                
            }
            return token;
            
        },
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}