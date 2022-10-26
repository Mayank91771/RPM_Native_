import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Touchable,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CheckBox from "expo-checkbox";
import axios from "axios";
import { useSelector } from "react-redux";
import { localHost } from "../config";
import { FlatList } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import moment from "moment";

function AttendanceScreen({ navigation }) {
  const loggedInAcademy = useSelector((state) => state.loggedInAcademy);

  const [isSelected, setSelection] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [memberDetails, setMemberDetails] = useState([]);

  useEffect(() => {
    getMemberList();
  }, []);

  const getMemberList = async () => {
    try {
      const { data } = await axios.get(
        `${localHost}api/users/get-member-details/${loggedInAcademy}`
      );
      setMemberDetails(data);
      // console.log("First render", memberDetails);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleTouchMe = (item) => {
    // console.log("Member details before", memberDetails);
    const memberDetailsArr = memberDetails.filter(
      (member) => member._id !== item._id
    );
    item.isChecked = !item.isChecked;
    memberDetailsArr.unshift(item);
    setMemberDetails(memberDetailsArr);
  };

  const submitHandler = async () => {
    const date = new Date();
    const momentDate = moment(date).format("YYYY-MM-DD");
    try {
      console.log("New Wrong Date", new Date());
      const { data } = await axios.post(
        `${localHost}api/users/member-attendance`,
        {
          date: momentDate,
          memberAttendance: memberDetails,
          academyName: loggedInAcademy,
        }
      );
      Alert.alert("Success", "Attendance has been submitted");
    } catch (err) {
      console.log(err.message);
      Alert.alert("", "Attendance has already been submitted for today.");
    }
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View>
              <TextInput
                placeholder="Search Member"
                style={styles.searchBar}
                onChangeText={(newText) => {
                  setSearchInput(newText);
                  console.log(newText);
                }}
              />
            </View>
            <FlatList
              data={memberDetails}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                // console.log("item.isChecked", item.isChecked);
                return (
                  <TouchableOpacity onPress={() => handleTouchMe(item)}>
                    <View
                      style={[
                        styles.checkBoxContainer,
                        item.isChecked && { backgroundColor: "powderblue" },
                      ]}
                    >
                      <View style={{ width: "50%" }}>
                        <Text
                          style={[
                            styles.memberName && item.isChecked
                              ? { color: "red" }
                              : { color: "black" },
                          ]}
                        >
                          {item.firstName + " " + item.lastName}
                        </Text>
                      </View>
                      <View style={styles.iconWithCheckBox}>
                        <Ionicons
                          name="calendar-outline"
                          color={item.isChecked ? "black" : "black"}
                          size={20}
                          style={styles.calenderIcon}
                        />
                        <TouchableOpacity>
                          {item.isChecked ? (
                            <Ionicons
                              name="checkmark-circle-outline"
                              color="black"
                              size={22}
                            />
                          ) : (
                            <Ionicons
                              name="checkmark-circle-outline"
                              color="black"
                              size={20}
                            />
                          )}
                        </TouchableOpacity>
                        {/* <CheckBox
                        value={item.isChecked}
                        onValueChange={() => (item.isChecked = !item.isChecked)}
                      /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity onPress={() => submitHandler()}>
              <Text style={styles.submitBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
    height: "95%",
    width: "95%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    minWidth: "70%",
    borderWidth: 1,
    padding: 10,
    marginVertical: 30,
  },
  checkBoxContainer: {
    flexDirection: "row",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    minWidth: "90%",
    marginVertical: 5,
    borderRadius: 20,
  },

  iconWithCheckBox: {
    flexDirection: "row",
  },
  calenderIcon: {
    marginRight: 10,
  },
  memberName: {
    fontSize: 15,
  },
  submitBtn: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "powderblue",
    color: "red",
  },
});

export default AttendanceScreen;
