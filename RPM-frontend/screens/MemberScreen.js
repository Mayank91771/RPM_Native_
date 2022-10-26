import React, { useEffect, useReducer } from "react";
import { StyleSheet, TextInput, View, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { localHost } from "../config";

function ViewMemberScreen({ navigation }) {
  const loggedInAcademy = useSelector((state) => state.loggedInAcademy);

  const [memberDetails, setMemberDetails] = useState([]);
  var [searchInput, setSearchInput] = useState("");

  const deleteMember = async (_id) => {
    try {
      console.log(_id);
      const res = await axios.delete(
        `${localHost}api/users/delete-member/${_id}`
      );
      console.log(res);
    } catch (e) {
      console.log(e.message);
      console.log("Record not deleted");
    }
  };

  useEffect(() => {
    const getMemberList = async () => {
      const { data } = await axios.get(
        `${localHost}api/users/get-member-details/${loggedInAcademy}`
      );
      setMemberDetails(data);
    };
    getMemberList();
  }, [memberDetails]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.heading}>VIEW MEMBERS</Text>
        <View style={styles.fields}>
          <TextInput
            placeholder="Search Member"
            style={styles.searchBar}
            onChangeText={(newText) => {
              setSearchInput(newText);
              console.log(newText);
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddMemberScreen")}
          >
            <Text style={styles.searchBtn}>ADD MEMBER</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 10,
            marginTop: 20,
            width: "100%",
            height: "100%",
          }}
        >
          <View>
            <ScrollView>
              {memberDetails
                ?.filter((item) => {
                  if (searchInput == "") {
                    return item;
                  } else if (
                    item.firstName
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return (
                    <View style={styles.memberList} key={item._id}>
                      <Text style={{ width: "45%", fontSize: 15 }}>
                        {`${item.firstName} `}
                        {item.lastName}
                      </Text>

                      <View>
                        <Text
                          style={{ width: 100, fontSize: 10, marginLeft: 20 }}
                        >
                          {`Belt: ${item.beltColor}`}
                        </Text>
                        <Text
                          style={{ width: 120, fontSize: 10 }}
                        >{`Membership: Active`}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("UpdateMemberScreen", { item });
                          console.log("This is item,", item);
                        }}
                      >
                        <Ionicons name="pencil" color="black" size={16} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteMember(item._id)}>
                        <Ionicons name="trash" color="red" size={16} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
    height: "95%",
    width: "95%",
    borderWidth: 1,
    alignItems: "center",
  },
  searchBtn: {
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "powderblue",
    color: "red",
    marginLeft: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 30,
  },
  searchBar: {
    width: "70%",
    borderWidth: 1,
    padding: 10,
  },
  fields: {
    flexDirection: "row",
  },
  memberList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  memberListHeading: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // marginVertical: 10,
    marginLeft: 20,
    width: "90%",
    backgroundColor: "red",
  },
});

export default ViewMemberScreen;
