import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signin, loggedInAcademy } from "../redux/actions";
import { localHost } from "../config";

let ScreenHeight = Dimensions.get("window").height;

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState("false");
  const [error, setError] = useState("");
  //
  const submitHandler = async (e) => {
    e.preventDefault();
    if (name == "") {
      alert("Please enter academy name");
    } else if (email == "") {
      alert("Please enter email address");
    } else if (password == "") {
      alert("Please enter password");
    } else {
      try {
        const { data } = await axios.post(`${localHost}api/users/login`, {
          email,
          password,
          name,
        });
        console.log("Before async storage");
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        dispatch(signin());
        const userInfo = await AsyncStorage.getItem("userInfo");
        const parseUserInfo = JSON.parse(userInfo);
        dispatch(loggedInAcademy(parseUserInfo.name));
        console.log(`${email} Successfully logged in`);
      } catch (error) {
        alert(error.response.data.message);
        setEmail("");
        setName("");
        setPassword("");
      }
    }
  };

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  // const getAsyncStorageData = async () => {
  //   const userInfo = await AsyncStorage.getItem("userInfo");

  //   if (userInfo) {
  //     setIsSignedIn("true");
  //   } else {
  //     setIsSignedIn("false");
  //   }
  // };

  // useEffect(() => {
  //   const userInfo = AsyncStorage.getItem("userInfo");

  //   if (userInfo) {
  //     setIsSignedIn("true");
  //     // navigation.navigate("Dashboard");
  //     console.log("user signed in");
  //   } else {
  //     setIsSignedIn("false");
  //     console.log("user not signed in");
  //   }
  // }, [isSignedIn]);

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
            <Text style={styles.label}>Academy Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Academy Name"
              value={name}
              onChangeText={(newText) => setName(newText)}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Email"
              value={email}
              onChangeText={(newText) => setEmail(newText)}
            />
            <Text>Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(newText) => setPassword(newText)}
            />

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.btnText}>
                New user? {/* <TouchableOpacity> */}
                <Text style={styles.registerText}>register here.</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={styles.btnText}>
                Forget Password? {/* <TouchableOpacity> */}
                <Text style={styles.registerText}>click here.</Text>
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}> */}
            <TouchableOpacity onPress={submitHandler}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
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

export default LoginScreen;
