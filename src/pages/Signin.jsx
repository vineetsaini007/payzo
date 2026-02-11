import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
          placeholder="vineet@gmail.com"
          label={"Email"}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputBox
        placeholder="123456"
        label={"Password"}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

        <div className="pt-4">
          <Button
  onClick={async () => {
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/v1/user/signin", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }}
  label={loading ? "Signing in..." : "Sign in"}
/>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}