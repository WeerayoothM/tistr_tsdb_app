import { Tabs, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR } from "@/styles/COLOR";
import XIconDashboard from "@/components/svg/XIconDashboard";
import XIconSearch from "@/components/svg/XIconSearch";
import XIconProfile from "@/components/svg/XIconProfile";
import { useEffect } from "react";
import { createNavigationContainerRef } from "@react-navigation/native";

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

export const navigationRef = createNavigationContainerRef();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  if (navigationRef.isReady()) {
    console.log("ready");
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }

  useEffect(() => {
    // router.push("/search/offBudget");
    if (navigationRef.isReady()) {
      // Perform navigation if the react navigation is ready to handle actions
      // navigationRef.
      // navigationRef.navigate(        "/search/offBudget"      );
    } else {
      // You can decide what to do if react navigation is not ready
      // You can ignore this, or add these actions to a queue you can call later
    }
  }, []);

  return (
    <Tabs
      initialRouteName="search"
      // tabBar={null}

      screenOptions={{
        tabBarActiveTintColor: COLOR.DARKBLUE,
        tabBarInactiveTintColor: COLOR.LIGHTGRAY,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLOR.WHITE,
          borderTopWidth: 0,
        },
      }}
      // tabBar={tab}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          // href: "/dashboard",
          title: "แดชบอร์ด",
          tabBarIcon: ({ color }) => (
            <XIconDashboard color={color} width="20px" height="20px" />
          ),
          headerShadowVisible: false, // applied here

          // tabBarStyle: {
          //   borderWidth: 2,
          // },
          // headerBackgroundContainerStyle: {
          //   backgroundColor: COLOR.RED,
          // },
          // headerBackTitleVisible: false,
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
          headerShown: false,
          headerShadowVisible: false, // applied here
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "โปรไฟล์",
          tabBarIcon: ({ color }) => (
            <XIconProfile color={color} width="20px" height="20px" />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
