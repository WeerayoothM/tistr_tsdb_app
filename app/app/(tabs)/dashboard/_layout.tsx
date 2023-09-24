import { DashboardProvider } from "@/context/DashboardContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <DashboardProvider>
      <ProjectProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, headerBackVisible: false }}
          />
          <Stack.Screen name="notification" options={{ headerShown: false }} />
        </Stack>
      </ProjectProvider>
    </DashboardProvider>
  );
};

export default StackLayout;
