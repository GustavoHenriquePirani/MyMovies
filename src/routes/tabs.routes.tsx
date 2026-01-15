import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import {
  BookmarkSimpleIcon,
  House,
  MagnifyingGlassIcon,
} from "phosphor-react-native";
import { Details } from "../screens/Details";
import { MyList } from "../screens/MyList";
import { Search } from "../screens/Search";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator
      id="TabNavigator"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          height: 85,
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#0296e5",
          paddingTop: 10,
        },
        headerShown: false,
        tabBarActiveTintColor: "#0296e5",
        tabBarInactiveTintColor: "#67686d",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={28} weight="light" />
          ),
        }}
      />

      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlassIcon color={color} size={28} weight="light" />
          ),
        }}
      />

      <Tab.Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarIcon: ({ color }) => (
            <BookmarkSimpleIcon color={color} size={28} weight="light" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
