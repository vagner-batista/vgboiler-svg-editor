import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiHandler } from 'next';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import nodemailer from 'nodemailer';
import { createHtml, createText } from '../../../lib/mailverification';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async function sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Efetue login em ${host}`,
          text: createText({ url, host }),
          html: createHtml({ url, host, email }),
        });
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  //callbacks: {
  //  async signIn({ user, account, profile, email, credentials }) {
  //    return true
  //  },
  //  async redirect({ url, baseUrl }) {
  //    return baseUrl
  //  },
  //  async session({ session, token, user }) {
  //    return session
  //  },
  //  async jwt({ token, user, account, profile, isNewUser }) {
  //    return token
  //  }
  //},
  //events: {
  //  async signIn(message) { /* on successful sign in */ },
  //  async signOut(message) { /* on signout */ },
  //  async createUser(message) { /* user created */ },
  //  async updateUser(message) { /* user updated - e.g. their email was verified */ },
  //  async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
  //  async session(message) { /* session is active */ },
  //},
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#f18739', // Hex color code
    logo: 'https://github.com/vagner-batista.png', // Absolute URL to image
  },
  useSecureCookies: true,
};

export default authHandler;
