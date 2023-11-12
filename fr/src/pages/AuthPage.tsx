import Typewriter from "typewriter-effect";
import { signal } from "@preact/signals-react"

const isAuth = signal(false)

const introText =
  "AI powered solution for the real-time business decisions optimization";

export const AuthPage = () => {

    return (
        <div className="w-full h-screen flex flew-nowrap gap-4 p-4">
            <div className="w-1/3 flex flex-col justify-center relative">
                <div className="absolute top-10 left-10">
                    <h3 className="text-4xl">creo</h3>
                    <p>ask build deploy</p>
                </div>
                <div className="max-w-[30rem] w-full flex flex-col justify-center mx-auto">
                    <h3 className="text-3xl font-bold">
                        {isAuth.value ? "Sign In" : "Sign Up"}
                    </h3>
                    <p>
                        {
                            isAuth.value ? "Welcome back" : (
                                <>
                                    <span className="font-light">Login</span> and <span className="font-light">password</span> is all you need to create an account
                                </>
                            )
                        }
                    </p>

                    <div className="flex flex-col gap-3 mt-6">
                        <input className="p-2 rounded-md border border-solid border-[#18213A]" type="text" placeholder="Login" />
                        {!isAuth.value && (
                            <input className="p-2 rounded-md border border-solid border-[#18213A]" type="text" placeholder="Team name" />
                        )}
                        <input className="p-2 rounded-md border border-solid border-[#18213A]" type="password" placeholder="Password" />
                        <button className="bg-[#18213A] rounded-md p-2 mt-2 text-white">
                            {isAuth.value ? "Proceed" : "Create account"}
                        </button>
                        <div className="text-center or_stroke flex items-center justify-center">
                            <span className="bg-white text-gray-600 z-20 relative">OR</span>
                        </div>
                        <button className="bg-[#d9dbe3] rounded-md p-2 mt-2" onClick={() => isAuth.value = !isAuth.value}>
                            {isAuth.value ? "Don't have account yet?" : "Already have an account?"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="auth_bg w-2/3 rounded-xl overflow-hidden flex justify-center relative items-center text-4xl">
                <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md"/>
                <div className="max-w-[40rem] z-30">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString(introText).start();
                        }}
                        options={{
                            delay: 3000 / introText.length,
                            wrapperClassName: "typewriter_text",
                            loop: true
                        }}
                    />
                </div>
            </div>
        </div>
    )
}