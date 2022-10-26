import React from "react";
import Dashboard from "../screens/Dashboard";
import MemberScreen from "../screens/MemberScreen";
import GenerateReports from "../screens/AttendanceScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#778899" },
      }}
    >
      <Tab.Group
        screenOptions={({ navigation }) => ({
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={25} style={{ marginLeft: "15%" }} />
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Members"
          component={MemberScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Report"
          component={GenerateReports}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}

export default AppTabNavigator;
