import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { localHost } from "../config";
import Ionicons from "react-native-vector-icons/Ionicons";

function UpdateMemberScreen({ navigation }) {
  const route = useRoute();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setContact] = useState();
  const [email, setEmail] = useState("");
  const [beltColor, setBeltRank] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [memberDetails, setMemberDetails] = useState([]);

  const updateMemberDetails = async () => {
    try {
      const { data } = await axios.post(
        `${localHost}api/users/update-member-details/${route.params.item._id}`,
        {
          firstName,
          lastName,
          mobileNumber,
          email,
          beltColor,
          membershipStatus,
        }
      );
      console.log(data);
      navigation.navigate("MemberScreen");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setFirstName(route.params.item.firstName);
    setLastName(route.params.item.lastName);
    setContact(route.params.item.mobileNumber);
    setEmail(route.params.item.email);
    setBeltRank(route.params.item.beltColor);
    setMembershipStatus("Active");
  }, []);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate("MemberScreen")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            minWidth: "95%",
            marginVertical: 5,
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            color="skyblue"
            size={30}
            style={styles.icons}
          />
          <Text style={{ alignSelf: "center", fontSize: 20, color: "skyblue" }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.heading}>UPDATE MEMBER</Text>
        <View style={styles.input}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#3A3B3C"
            style={styles.inputFields}
            value={firstName}
            editable={true}
            onChangeText={(newText) => {
              setFirstName(newText);
            }}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#3A3B3C"
            style={styles.inputFields}
            value={lastName}
            onChangeText={(newText) => setLastName(newText)}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#3A3B3C"
            style={styles.inputFields}
            value={email}
            onChangeText={(newText) => setEmail(newText)}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Contact</Text>
          <TextInput
            placeholder="Contact"
            placeholderTextColor="#3A3B3C"
            style={styles.inputFields}
            value={`${mobileNumber}`}
            onChangeText={(newText) => setContact(newText)}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Belt Rank</Text>
          <TextInput
            placeholder="Belt Rank"
            placeholderTextColor="#3A3B3C"
            style={styles.inputFields}
            value={beltColor}
            onChangeText={(newText) => setBeltRank(newText)}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Membership</Text>
          <TextInput
            placeholder="Active"
            placeholderTextColor="#3A3B3C"
            style={styles.inputFields}
            value={membershipStatus}
            onChangeText={() => setMembershipStatus("Active")}
          />
        </View>
        <TouchableOpacity onPress={updateMemberDetails}>
          <Text style={styles.submitBtn}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
    height: "92%",
    width: "95%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    width: "30%",
    alignSelf: "center",
  },
  inputFields: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    width: "60%",
    marginLeft: 20,
  },
  input: {
    flexDirection: "row",
    marginBottom: 20,
  },
  submitBtn: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "powderblue",
    color: "red",
    minWidth: "60%",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UpdateMemberScreen;
