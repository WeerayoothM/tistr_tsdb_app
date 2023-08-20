import jwtDecode from "jwt-decode";
import { get, isEmpty } from "lodash";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/stores";
import { getToken } from "../utils/localStorage";

interface Token {
  role: string;
  id: number;
}

const ProtectedRoute: React.FC<any> = ({ user }) => {
  let token = {} as Token;
  if (getToken()) {
    token = (getToken() ? jwtDecode(getToken() as string) : "") as Token;
  }

  if (isEmpty(token)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
