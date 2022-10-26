import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemberScreen from "../screens/MemberScreen";
import AddMemberScreen from "../screens/AddMemberScreen";
import UpdateMemberScreen from "../screens/UpdateMemberScreen";

const Stack = createNativeStackNavigator();

function MemberScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName="MemberScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MemberScreen" component={MemberScreen} />
      <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} />
      <Stack.Screen
        name="UpdateMemberScreen"
        component={UpdateMemberScreen}
        screenOptions={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default MemberScreenStack;
