import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  useEffect(() => {
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup successful.")
    }
    if(registerError){
      toast.error(registerError.data.message || "Signup Failed");
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login successful.");
   
    }
    if(loginError){ 
      toast.error(loginError.data.message || "login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);


  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-neutral-100 to-neutral-200">
      <div className="h-full w-full flex items-center justify-center p-6">
        <div className="w-full max-w-6xl mx-auto">
          <Tabs defaultValue="SignUp" className="w-full">
            <TabsList className="grid grid-cols-2 bg-neutral-200 p-1 rounded-full mb-6 shadow-sm w-full max-w-md mx-auto">
              <TabsTrigger
                value="SignUp"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-neutral-900 text-neutral-600 transition-all duration-300"
              >
                Sign Up
              </TabsTrigger>
              <TabsTrigger
                value="Login"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-neutral-900 text-neutral-600 transition-all duration-300"
              >
                Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="SignUp">
              <Card className="bg-white border-none shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="bg-neutral-50 py-6 px-6 border-b border-neutral-100">
                  <CardTitle className="text-3xl font-extrabold text-neutral-900">
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-neutral-500 mt-2">
                    Start your journey with us
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-700">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={signupInput.name}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Enter your full name"
                      required
                      className="bg-neutral-50 border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-700">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={signupInput.email}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="you@example.com"
                      required
                      className="bg-neutral-50 border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-neutral-700">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={signupInput.password}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="Create a strong password"
                      required
                      className="bg-neutral-50 border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-neutral-50 border-t border-neutral-100 p-6">
                <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="Login">
              <Card className="bg-white border-none shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="bg-neutral-50 py-6 px-6 border-b border-neutral-100">
                  <CardTitle className="text-3xl font-extrabold text-neutral-900">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-neutral-500 mt-2">
                    Log in to continue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-700">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={loginInput.email}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="you@example.com"
                      required
                      className="bg-neutral-50 border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-neutral-700">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={loginInput.password}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="Enter your password"
                      required
                      className="bg-neutral-50 border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                    <div className="text-right">
                      <a
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-neutral-50 border-t border-neutral-100 p-6">
                  <Button
                    disabled={loginIsLoading}
                    onClick={() => handleRegistration("login")}
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        wait
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
