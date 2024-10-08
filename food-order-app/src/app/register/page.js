"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            setCreatingUser(false);

            if (!response.ok) {
                throw new Error(`Failed to create user: ${response.status}`);
            }
            setUserCreated(true);
        } catch (error) {
            console.error("Error:", error);
            setError(true);
            setCreatingUser(false);
        }
    }

    return (
        <section className="mt-8 ">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                {userCreated && (
                    <div className="my-4 text-center">
                        User created.
                        <br /> Now you can{" "}
                        <Link className="underline" href={"/login"}>
                            Login &raquo;
                        </Link>
                    </div>
                )}
                {error && (
                    <div className="my-4 text-center text-red-600">
                        Error.
                        <br />
                        Please try again later
                    </div>
                )}
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={creatingUser}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={creatingUser}
                />
                <button type="submit" disabled={creatingUser}>
                    Register
                </button>
                <div className="my-4 text-center text-gray-400">
                    or login with provider
                </div>
                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="flex gap-4 justify-center"
                    type="button"
                >
                    <Image src={"/google.png"} alt={""} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{" "}
                    <Link className="underline" href={"/login"}>
                        Login here &raquo;
                    </Link>
                </div>
            </form>
        </section>
    );
};

export default RegisterPage;
