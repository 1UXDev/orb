import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [formError, setFormError] = useState(null);
  const [passwords, setPasswords] = useState({
    password: "",
    confirm_password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (
      !data.fullname ||
      !data.email ||
      !data.password ||
      !data.confirm_password
    ) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      if (res.ok) {
        console.log("Alles erledigt");
        e.target.reset();
        router.push("/");
      } else {
        const responseJson = await res.json();
        setFormError(responseJson.message);
      }
    } catch (err) {
      console.error("Error occured!!!!!!", err);
      setFormError(err.message);
    }
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form className="RegisterForm" onSubmit={registerUser}>
              <input
                id="fullname"
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                required
              />

              <input
                id="email"
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
              />

              <input
                id="password"
                onChange={(e) =>
                  setPasswords({ ...passwords, password: e.target.value })
                }
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                required
              />
              <input
                id="confirm_password"
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirm_password: e.target.value,
                  })
                }
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
                required
              />
              <div className="checkPassword">
                {passwords?.confirm_password.length > 0
                  ? passwords.password === passwords.confirm_password
                    ? "Passwords Match ✔️"
                    : "Not Matching yet ❌"
                  : ""}
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
            {formError && (
              <div
                className="error"
                style={{ fontWeight: "bold", color: "red" }}
              >
                {formError}
              </div>
            )}

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
