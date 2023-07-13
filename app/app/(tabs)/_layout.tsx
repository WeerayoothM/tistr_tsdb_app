import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR } from "@/styles/COLOR";
import XIconDashboard from "@/components/svg/XIconDashboard";
import XIconSearch from "@/components/svg/XIconSearch";
import XIconProfile from "@/components/svg/XIconProfile";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon({
  isCommunity,
  ...props
}: {
  isCommunity: boolean;
  name: any;
  color: string;
}) {
  return isCommunity ? (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  ) : (
    <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="dashboard"
      // tabBar={null}

      screenOptions={{
        tabBarActiveTintColor: COLOR.DARKBLUE,
        tabBarInactiveTintColor: COLOR.LIGHTGRAY,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          href: "/dashboard",
          title: "แดชบอร์ด",
          tabBarIcon: ({ color }) => (
            <XIconDashboard color={color} width="20px" height="20px" />
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "ค้นหาโครงการ",
          tabBarIcon: ({ color }) => (
            <XIconSearch color={color} width="20px" height="20px" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "โปรไฟล์",
          tabBarIcon: ({ color }) => (
            <XIconProfile color={color} width="20px" height="20px" />
          ),
        }}
      />
    </Tabs>
  );
}
