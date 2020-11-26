import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`;

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SignOutMutation);

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push("/signin");
      });
    });
  }, [signOut, router, client]);

  return <p>Signing out...</p>;
}

export default SignOut;
