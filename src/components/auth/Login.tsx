import Button from "../reusable/Button"




const Login = () => {

    return<main >
        <header  className="bg-primary p-4">
            <h3 className="text-lg italic uppercase text-white">Welcome to Admin panel</h3>
        </header>

        <section className="w-[100vw] h-[70vh] flex justify-center items-center">
            <form className="min-w-[20rem] border-2 rounded-xl p-4 flex flex-col gap-4 shadow-xl" onSubmit={(e) => e.preventDefault()}>
                <legend className="text-2xl font-bold capitalize text-center">Login form</legend>
               <fieldset className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="email">Email</label>
                    <input placeholder="Enter your email" className="border-2 rounded p-1 focus:outline-primary" type="email" name="email" id="email" />
                </fieldset> 
                <fieldset className="flex flex-col gap-2">
                    <label className="text-lg font-medium" htmlFor="password">Password</label>
                    <input placeholder="Enter your passwrod" className="border-2 rounded p-1 focus:outline-primary" type="password" name="password" id="password" />
                </fieldset>
                <Button className="w-[100%]">Login</Button>
            </form>
        </section>

    </main>
}

export default Login