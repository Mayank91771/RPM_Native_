import { useEffect, useState, React } from "react";
import { Text, View, Button, Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Financial, Attendance } from "../screens/GenerateReportScreen";

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Financial"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="Financial"
        component={Financial}
        options={{ tabBarLabel: "Financials" }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{ tabBarLabel: "Attendance" }}
      />
    </Tab.Navigator>
  );
}
