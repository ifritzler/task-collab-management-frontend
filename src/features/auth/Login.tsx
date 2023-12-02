import { BaseSyntheticEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useSignal } from "@preact/signals-react";

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const email = useSignal("");
  const password = useSignal("");
  const errorMessage = useSignal("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    userRef.current?.focus();
  }, []);


  const handleEmailInput = async (e: BaseSyntheticEvent) => {
    email.value = e.target.value;
  };
  const handlePwdInput = async (e: BaseSyntheticEvent) => {
    password.value = e.target.value;
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const userData = await login({
        email: email.value,
        password: password.value,
      }).unwrap();
      dispatch(setCredentials({ ...userData, user: email }));
      email.value = "";
      password.value = "";
      navigate("/welcome");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (!e?.status) {
        errorMessage.value = "No server response, try again later.";
      } else if (e.status === 400) {
        errorMessage.value = "Missing email or password.";
      } else if (e.status === 401) {
        errorMessage.value = "Invalid credentials";
      } else {
        errorMessage.value = "Invalid credentials";
      }
    }
    errorRef.current?.focus();
  };
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          ref={userRef}
          onChange={handleEmailInput}
          value={email.value}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={handlePwdInput}
          value={password.value}
        />
        {errorMessage && <p ref={errorRef}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
