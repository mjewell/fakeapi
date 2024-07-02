import "next-auth";
import "next-auth/jwt";

declare module "next" {
  interface NextApiRequest {
    auth: {
      user: {
        id: string;
        email: string | null;
        name: string | null;
      };
      expires: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
