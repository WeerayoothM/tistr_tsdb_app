import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider } from "../src/context/AuthProvider";
import { StatusBar } from "expo-status-bar";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "(tabs)",
// };

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    BaiJamjuree_Regular: require("../assets/fonts/BaiJamjuree-Regular.ttf"),
    BaiJamjuree_Medium: require("../assets/fonts/BaiJamjuree-Medium.ttf"),
    BaiJamjuree_Bold: require("../assets/fonts/BaiJamjuree-Bold.ttf"),
    BaiJamjuree_SemiBold: require("../assets/fonts/BaiJamjuree-SemiBold.ttf"),
    BaiJamjuree_Italic: require("../assets/fonts/BaiJamjuree-Italic.ttf"),
    BaiJamjuree_Bold_Italic: require("../assets/fonts/BaiJamjuree-BoldItalic.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={"auto"} />

      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
