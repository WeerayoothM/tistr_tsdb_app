import { ProjectProvider } from "@/context/ProjectContext";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <ProjectProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, headerBackVisible: false }}
        />
        <Stack.Screen name="offBudget" options={{ headerShown: false }} />
        <Stack.Screen
          name="onBudget"
          options={{ headerShown: false, headerBackVisible: false }}
        />
        <Stack.Screen
          name="result"
          options={{ headerShown: false, headerBackVisible: false }}
        />
        <Stack.Screen
          name="[project_id]"
          options={{ headerShown: false, headerBackVisible: false }}
        />
      </Stack>
    </ProjectProvider>
  );
};

export default StackLayout;
