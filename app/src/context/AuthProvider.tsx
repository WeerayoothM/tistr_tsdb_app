import LocalStorage from "@/utils/LocalStorage";
import { useSegments, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  Username: string;
  FName: string;
  LName: string;
  Position: string;
  Division: string;
  SubDivision: string;
  EmpId: string;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/dashboard");
    }
  }, [user, segments]);
}

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const _setUser = async (user: User) => {
    setUser(user);
    LocalStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    (async () => {
      setUser(JSON.parse(await LocalStorage.getItem("user")));
    })();
  }, []);

  useProtectedRoute(user);

  const authContext: AuthType = {
    user,
    setUser: _setUser,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
