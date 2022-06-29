import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiHandler } from "next";
import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';
import prisma from "../../../lib/prisma";

const authHandler:NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET
}

export default authHandler;