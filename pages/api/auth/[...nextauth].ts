// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log('NextAuth callback: jwt');
      if (account) {
        token.accessToken = account.access_token;
        console.log('NextAuth callback: account access token', account.access_token);
      }
      return token;
    },
    async session({ session, token }) {
      console.log('NextAuth callback: session');
      session.accessToken = token.accessToken as string;
      console.log('NextAuth callback: session access token', token.accessToken);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Ensure to specify the session strategy
  },
});
