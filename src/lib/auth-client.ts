import { auth } from "@/lib/firebase";

export const authClient = {
  useSession: () => {
    return {
      data: auth.currentUser ? { user: auth.currentUser } : null,
      isPending: false,
    };
  },
  signIn: {
    email: async () => {},
    social: async () => {},
  },
  signUp: {
    email: async () => {},
  },
  signOut: async () => {
    return auth.signOut();
  },
};