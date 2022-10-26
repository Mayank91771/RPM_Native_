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
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useEffect } from "react";
import { localHost } from "../config";

function RegistrationScreen({ navigation }) {
  const [name, setAcademyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name == "") {
      alert("Academy name field can not be empty");
    } else if (email == "") {
      alert("Email field can not be empty");
    } else if (password == "") {
      alert("Password field can not be empty");
    } else if (confirmPassword == "") {
      alert("Confirm password field can not be empty");
    } else if (password != confirmPassword) {
      alert("Password and confirm password doesnt match");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        console.log("Before registration");
        const { data } = await axios.post(
          // "http://10.0.2.2:3000/api/users/create",
          `${localHost}api/users/create`,
          {
            name,
            email,
            password,
          },
          config
        );
        console.log(`${name}} has been registered`);
        navigation.navigate("Login");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    setAcademyName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="blue"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <KeyboardAwareScrollView>
        <View style={styles.Wrapper}>
          <View style={styles.loginContainer}>
            <Text style={styles.heading}>Registration</Text>
            <Text style={styles.label}>Academy Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Academy Name"
              onChangeText={(newText) => setAcademyName(newText)}
            />
            <Text>Email</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Email"
              onChangeText={(newText) => setEmail(newText)}
            />
            <Text>Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(newText) => setPassword(newText)}
            />
            <Text>Confirm Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(newText) => setConfirmPassword(newText)}
            />
            <TouchableOpacity onPress={submitHandler}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 20,
    backgroundColor: "#f8f8ff",
    minWidth: "80%",
    paddingVertical: "20%",
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
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    textAlign: "center",
  },
});

export default RegistrationScreen;
