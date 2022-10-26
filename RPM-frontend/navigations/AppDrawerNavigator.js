import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../screens/Dashboard";
import MemberScreen from "../screens/MemberScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import ContactUs from "../screens/ContactUs";
import GenerateReport from "../screens/GenerateReportScreen";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppTabNavigator from "./AppTabNavigator";
import { TouchableOpacity } from "react-native";
import MemberScreenStack from "./MemberScreenStack";
import MyTabs from "./TabsGenerateReport";

const Drawer = createDrawerNavigator();

function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: "powderblue",
        drawerActiveTintColor: "black",
        drawerInactiveTintColor: "black",
        drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
      }}
    >
      <Drawer.Group
        screenOptions={({ navigation }) => ({
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={25} style={{ marginLeft: "15%" }} />
            </TouchableOpacity>
          ),
        })}
      >
        {/* <Drawer.Screen
          name="AppTabNavigator"
          component={AppTabNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        /> */}
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Members"
          component={MemberScreenStack}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="person" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Attendance"
          component={AttendanceScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Reports"
          component={MyTabs}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="bar-chart" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact Us"
          component={ContactUs}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="call-sharp" size={22} color={color} />
            ),
          }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

export default AppDrawerNavigator;
