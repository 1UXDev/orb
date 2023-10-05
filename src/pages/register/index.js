import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch("../api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }), // does data have to be wrapped as object here?
    });
    const { user } = await response.json();
    console.log("register form", { user });
    router.push("/");
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form className="RegisterForm" onSubmit={registerUser}>
              <input
                id="data.fullname"
                onChange={(e) => setData({ ...data, fullname: e.target.value })}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
              />

              <input
                id="data.email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />

              <input
                id="data.password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />
              <input
                id="data.confirm_password"
                onChange={(e) =>
                  setData({ ...data, confirm_password: e.target.value })
                }
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
              />
              <div className="checkPassword">
                {data.confirm_password.length > 0
                  ? data.password === data.confirm_password
                    ? "Confirmed"
                    : "Not Matching yet"
                  : ""}
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}
