import { gql, useApolloClient, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Field from "../components/field";
import { getErrorMessage } from "../lib/form";

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      });
      if (data.signIn.user) {
        await router.push("/");
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <button type="submit">Sign in</button> or{" "}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </form>
    </>
  );
}

export default SignIn;
