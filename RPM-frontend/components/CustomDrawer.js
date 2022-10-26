import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signout } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function CustomDrawer(props) {
  const dispatch = useDispatch();
  logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      dispatch(signout());
      console.log("User has been logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "grey" }}>
        {/* <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="mail" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Contact Us</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => logoutUser()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;
