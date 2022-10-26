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
import { signin, loggedInAcademy } from "./redux/actions";

let ScreenHeight = Dimensions.get("window").height;

export default function Navigation() {
  const isSignedIn = useSelector((state) => state.isSignedIn);
  const dispatch = useDispatch();

  // const [isSignedIn, setIsSignedIn] = useState(false);
  // const [userInformation, setUserInfo] = useState("");

  const getUserSignIn = async () => {
    const userSignInInfo = await AsyncStorage.getItem("userInfo");
    if (userSignInInfo) {
      dispatch(signin());
      console.log("User is logged in.");
      const parseUserInfo = JSON.parse(userSignInInfo);
      dispatch(loggedInAcademy(parseUserInfo.name));
    }
  };

  useEffect(() => {
    getUserSignIn();
  });

  return (
    <NavigationContainer>
      {isSignedIn ? <AppDrawerNavigator /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "white",
    height: ScreenHeight,
  },
});
