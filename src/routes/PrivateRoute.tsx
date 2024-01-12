import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  if (user) return { children };
  const router = useRouter;
};

export default PrivateRoute;
