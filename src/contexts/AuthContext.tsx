// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { User, Session } from "@supabase/supabase-js";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { api } from "@/lib/axiosConfig";
// import { useFetchAuthUser } from "@/hooks/useCourse";

// interface AuthContextType {
//   user: User | null;
//   session: Session | null;
//   isAdmin: boolean;
//   isLoading: boolean;
//   mfaRequired: boolean;
//   mfaFactorId: string | null;
//   signIn: (email: string, password: string) => Promise<{ res: any; mfaRequired?: boolean; factorId?: string }>;
//   signUp: (email: string, password: string, username:string, userType?: string) => Promise<{res:any}>;
//   signOut: () => Promise<void>;
//   completeMFAVerification: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [mfaRequired, setMfaRequired] = useState(false);
//   const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
//   const { toast } = useToast();
  // const {data:fetchUser} = useFetchAuthUser()
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   console.log(fetchUser, 'fetch users')

//   const checkAdminStatus = async (userId: string) => {
//     try {
//       const { data, error } = await supabase
//         .from("user_roles")
//         .select("role")
//         .eq("user_id", userId)
//         .eq("role", "admin")
//         .maybeSingle();

//       if (error) {
//         console.error("Error checking admin status:", error);
//         setIsAdmin(false);
//         return;
//       }

//       setIsAdmin(!!data);
//     } catch (error) {
//       console.error("Error checking admin status:", error);
//       setIsAdmin(false);
//     }
//   };

//   // useEffect(() => {
//   //   // Set up auth state listener FIRST
//   //   const { data: { subscription } } = supabase.auth.onAuthStateChange(
//   //     (event, session) => {
//   //       setSession(session);
//   //       setUser(session?.user ?? null);
        
//   //       // Defer admin check with setTimeout to prevent deadlock
//   //       if (session?.user) {
//   //         setTimeout(() => {
//   //           checkAdminStatus(session.user.id);
//   //         }, 0);
//   //       } else {
//   //         setIsAdmin(false);
//   //       }
        
//   //       setIsLoading(false);
//   //     }
//   //   );

//   //   // THEN check for existing session
//   //   supabase.auth.getSession().then(({ data: { session } }) => {
//   //     setSession(session);
//   //     setUser(session?.user ?? null);
      
//   //     if (session?.user) {
//   //       setTimeout(() => {
//   //         checkAdminStatus(session.user.id);
//   //       }, 0);
//   //     }
      
//   //     setIsLoading(false);
//   //   });

//   //   return () => subscription.unsubscribe();
//   // }, []);

//   useEffect(() => {
//   if (isAuthenticated && fetchUser) { // or whatever signals login
//     navigate(isAdmin ? "/admin" : "/profile");
//   }
// }, [isAuthenticated, isAdmin, navigate]);

//   const signIn = async (email: string, password: string) => {
//     const redirectUrl = `${window.location.origin}/profile`;
//     // const { data, error } = await supabase.auth.signInWithPassword({
//     //   email,
//     //   password,
//     // });
//     const  res   = await api.post('/login',{
//       email,
//       password,
//     });

//     console.log(res?.data, 'login data in auth context')
//     if(res?.data?.success){
//       sessionStorage.setItem('userToken', res.data?.token)
//       emailRedirectTo: redirectUrl

//     }
    
    
    
    
//     return { res };
//   };

//   const completeMFAVerification = () => {
//     setMfaRequired(false);
//     setMfaFactorId(null);
//   };

//   const signUp = async (email: string, password: string, username:string, userType?:string) => {
//     const redirectUrl = `${window.location.origin}/`;
    
//     const res = await api.post( 'register', {
//       email,
//       password,
//       username,
//       userType,
//       // options: {
//       //   emailRedirectTo: redirectUrl,
//       // },
//     });

//     console.log(res, 'res in auth context secton')

//     if(res?.data?.success){
//       toast({
//         title: "Sign Up success",
//         description: res.data?.message,
//         variant: "destructive",
//       });

//       emailRedirectTo: redirectUrl
//     }
    
   
    
//     return { res };
//   };

//   const signOut = async () => {
//     await supabase.auth.signOut();
//     setIsAdmin(false);
//     sessionStorage.removeItem('userToken')
//     toast({
//       title: "Signed Out",
//       description: "You have been successfully signed out.",
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         session,
//         isAdmin,
//         isLoading,
//         mfaRequired,
//         mfaFactorId,
//         signIn,
//         signUp,
//         signOut,
//         completeMFAVerification,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };



// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { api, authApi } from "@/lib/axiosConfig";

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  role: string;
  userType: string;
}

interface AuthContextType {
  currentUser: CurrentUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signUp: (
    email: string,
    password: string,
    username: string,
    userType?: string
  ) => Promise<{ success: boolean; message?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const isAuthenticated = !!token && !!currentUser;
  const isAdmin = currentUser?.role === "admin";



  useEffect(() => {
  const storedToken = sessionStorage.getItem("userToken");

  if (!storedToken) {
    setIsLoading(false);
    return;
  }

  try {
    const payloadBase64 = storedToken.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));

    setCurrentUser({
      id: payload.sub,
      email: payload.email,
      username: payload.username,
      role: payload.role,
      userType: payload.userType ?? "customusers",
    });

    setToken(storedToken);
  } catch {
    sessionStorage.removeItem("userToken");
    setToken(null);
    setCurrentUser(null);
  } finally {
    setIsLoading(false);
  }
}, []);



  const signIn = async (email: string, password: string) => {
    try {
      const res = await api.post("/login", { email, password });

      if (res.data?.success) {
        const { token, user } = res.data;
        sessionStorage.setItem("userToken", token);
        setToken(token);
        setCurrentUser(user);

        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.username}`,
        });

        return { success: true };
      } else {
        toast({
          title: "Login failed",
          description: res.data?.message || "Invalid credentials",
          variant: "destructive",
        });
        return { success: false, message: res.data?.message };
      }
    } catch (err: any) {
      const message = err.response?.data?.error || "Network error";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return { success: false, message };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    username: string,
    userType = "customusers"
  ) => {
    try {
      const res = await api.post("/register", {
        email,
        password,
        username,
        userType,
      });

      if (res.data?.success) {
        toast({
          title: "Account created!",
          description: res.data.message || "You can now sign in.",
        });
        return { success: true };
      } else {
        toast({
          title: "Sign up failed",
          description: res.data?.message || "Something went wrong",
          variant: "destructive",
        });
        return { success: false, message: res.data?.message };
      }
    } catch (err: any) {
      const message = err.response?.data?.error || "Network error";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return { success: false, message };
    }
  };

  const signOut = () => {
    sessionStorage.removeItem("userToken");
    setToken(null);
    setCurrentUser(null);
    
    toast({
      title: "Signed out",
      description: "You have been logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isAuthenticated,
        isAdmin,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};