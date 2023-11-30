import  { useAuthResult } from "../../hooks/useAuth"
import Button from "../reusable/Button"




const Login = ({handleChange, isLoading,login, emailValid, passwordValid, isError} : useAuthResult) => {


    return(<main >
        <header  className="bg-primary p-4">
            <h3 className="text-lg italic uppercase text-white">Welcome to Admin panel</h3>
        </header>        
        <section className="w-[100vw] h-[70vh] flex justify-center items-center">
            <form className="min-w-[20rem] border-2 rounded-xl p-4 flex flex-col gap-4 shadow-xl" onSubmit={(e) => {
                e.preventDefault();
                login()
            }}>
                <legend className="text-2xl font-bold capitalize text-center">Login form</legend>
               <fieldset className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="email">Email</label>
                    <input onChange={handleChange} placeholder="Enter your email" className="border-2 rounded p-1 focus:outline-primary" type="email" name="email" id="email" />
                    
                    <span className={`text-sm italic transition-all duration-100 text-red-600 ${emailValid ? "opacity-0" : "opacity-100"}`}>Enter a valid email</span>
                    
                </fieldset> 
                <fieldset className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="password">Password</label>
                    <input onChange={handleChange} placeholder="Enter your passwrod" className="border-2 rounded p-1 focus:outline-primary" type="password" name="password" id="password" />
                    <span className={`text-sm italic transition-all duration-100 text-red-600 ${passwordValid ? "opacity-0" : "opacity-100"}`}>Password can't be a blank</span>
                </fieldset>
                {isError ? <h3 className={`transition-all duration-100 text-red-600`}>Wrong email or password</h3> : null}
                <Button disabled={isLoading || [emailValid, passwordValid].includes(false) ? true : false} className="w-[100%]">Login</Button>
            </form>
        </section>

    </main>)
}

export default Login