import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { localHost } from "../config";

function ConfirmAndResetScreen({ navigation, onPress }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   const submitHandler = async (e) => {
  //     e.preventDefault();

  //     if (password == confirmPassword) {
  //       try {
  //         const config = {
  //           headers: {
  //             "Content-type": "application/json",
  //           },
  //         };
  //         const { data } = await axios.post(
  //           "http://192.168.0.150:3000/api/users/change-password",
  //           {
  //             email,
  //             password,
  //             confirmPassword,
  //           },
  //           config
  //         );
  //         console.log(`Password has been reset for ${email}`);
  //         console.log(data);
  //         navigation.navigate("Login");
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     } else {
  //       console.log("Passwords doesnt match");
  //     }
  //   };

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="blue"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <SafeAreaView>
        <View>
          <View style={styles.loginContainer}>
            <Text style={styles.label}>OTP</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter your otp here"
              onChangeText={(newText) => setEmail(newText)}
            />
            <Text>New Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              onChangeText={(newText) => setPassword(newText)}
            />
            <Text>Confirm Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Confirm Password"
              onChangeText={(newText) => setConfirmPassword(newText)}
            />

            {/* <TouchableOpacity onPress={() => navigation.navigate("")}>
              <Text style={styles.btnText}>
                New user?
                <Text style={styles.registerText}>register here.</Text>
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}> */}
            <TouchableOpacity onPress={onPress}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    marginTop: 20,
    backgroundColor: "#f8f8ff",
    minWidth: "80%",
    paddingVertical: "35%",
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  heading: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#66b3ff",
    marginTop: 20,
  },
  btnText: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    textAlign: "center",
  },
  registerText: {
    color: "#66b3ff",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
  },
});

export default ConfirmAndResetScreen;
