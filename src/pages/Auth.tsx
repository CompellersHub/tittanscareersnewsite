import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { z } from "zod";
import { passwordSchema } from "@/lib/formSchemas";
import { PasswordStrengthIndicator } from "@/components/forms/PasswordStrengthIndicator";
import { supabase } from "@/integrations/supabase/client";
import { MFAVerification } from "@/components/auth/MFAVerification";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z.string(),
  password: passwordSchema,
});

const loginAuthSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: passwordSchema,
});

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("customusers");
  const { signIn, signUp, isAuthenticated, isAdmin , isLoading: authLoading} = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);



useEffect(() => {
  if (authLoading) return;                    // still wait for initial load

  // Only redirect if we are currently on the auth page
  if (isAuthenticated && window.location.pathname === "/auth") {
    navigate(isAdmin ? "/admin" : "/profile", { replace: true });
  }


  // if (isAuthenticated ) {
  //   navigate( "/admin",  { replace: true });
  // }
}, [isAuthenticated, isAdmin, authLoading, navigate]);


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      const result = await signIn(email, password);
      
      if (result.success) {
        setIsLoading(false);
}
  
      // if (result.success) {
      //   // Redirect is handled by the useEffect above
      //   setIsLoading(false)
      // }
    } catch (error) {
      console.log(error)
    }
  }


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signUp(email, password, username, userType);
    setIsLoading(false);


    if (result.success) {
      // Optionally auto-login after signup, or just redirect to login tab
      navigate("/auth"); // or stay on auth page and show success
    }
  };



  return (
    <PageLayout intensity3D="subtle" show3D={true}>
      <div className="flex flex-col">
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-tc-navy">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to access your admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-tc-navy hover:bg-tc-blue"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="your"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <PasswordStrengthIndicator password={password} />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-tc-amber hover:bg-tc-gold text-tc-navy"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Sign Up
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Auth;
