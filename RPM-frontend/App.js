import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import MemberScreen from "./screens/MemberScreen";
import ForgetPassword from "./screens/ForgetPassword";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppDrawerNavigator from "./navigations/AppDrawerNavigator";
import AuthenticationStack from "./navigations/AuthenticationStack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import { AddMemberScreen } from "./screens/AddMemberScreen";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
