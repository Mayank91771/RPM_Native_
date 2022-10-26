import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { localHost } from "../config";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Dashboard({ navigation }) {
  const loggedInAcademy = useSelector((state) => state.loggedInAcademy);

  const [revenueCount, setRevenueCount] = useState([]);
  const [memberRetention, setMemberRetention] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [monthlyUserCount, setMonthlyUserCount] = useState([{}]);
  const [monthlyUserCheck, setMonthlyUserCheck] = useState(false);
  // logoutUser = async () => {
  //   try {
  //     await AsyncStorage.removeItem("userInfo");
  //     console.log("User has been logged out");
  //     navigation.navigate("Login");
  //   } catch (e) {
  //     console.log(e.message);
  //   }

  //   console.log("Done.");
  // };

  const getRevenueCount = async () => {
    try {
      let count = 0;
      axios
        .get(`${localHost}api/users/get-member-details/${loggedInAcademy}`)
        .then((response) => {
          setTotalUsers(response.data);
        });
      for (let i in totalUsers) {
        if (totalUsers[i].membershipStatus == "Active") {
          count = count + 100;
        }
      }
      setRevenueCount(count);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCustomDateData = async () => {
    try {
      const { data } = await axios.get(
        `${localHost}api/users/new-member/${loggedInAcademy}`
      );
      setMonthlyUserCount(data);
      setMonthlyUserCheck(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTotalMemberRetention = async () => {
    let totalMemberCount = 0;
    let activeMemberCount = 0;
    try {
      axios
        .get(`${localHost}api/users/get-member-details/${loggedInAcademy}`)
        .then((response) => {
          setTotalUsers(response.data);
        });
      for (let i in totalUsers) {
        totalMemberCount++;
        if (totalUsers[i].membershipStatus == "Active") {
          activeMemberCount++;
        }
      }
      const memberRetentionRate = Math.floor(
        (activeMemberCount / totalMemberCount) * 100
      );
      setMemberRetention(memberRetentionRate);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRevenueCount();
    getCustomDateData();
    getTotalMemberRetention();
  }, [revenueCount, monthlyUserCount]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="blue"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.statsHeading}>Statistics</Text>
            <View style={styles.totalRevenueContainer}>
              <CircularProgress
                value={revenueCount ? revenueCount : 0}
                // value={10000}
                radius={80}
                duration={3000}
                progressValueColor={"black"}
                maxValue={10000}
                valuePrefix={"$"}
                // valueSuffix={"k"}
                inActiveStrokeColor={"lightblue"}
                inActiveStrokeOpacity={0.2}
                activeStrokeColor={"powderblue"}
                activeStrokeSecondaryColor={"powderblue"}
              />
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>Total</Text>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  Revenue
                </Text>
              </View>
            </View>
            <View style={styles.totalRevenueContainer}>
              <CircularProgress
                value={memberRetention ? memberRetention : "0"}
                radius={80}
                duration={3000}
                progressValueColor={"black"}
                maxValue={100}
                valueSuffix={"%"}
                inActiveStrokeColor={"blue"}
                inActiveStrokeOpacity={0.2}
                activeStrokeColor={"powderblue"}
                activeStrokeSecondaryColor={"skyblue"}
              />

              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>Member</Text>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  Retention
                </Text>
              </View>
            </View>

            {/* Members chart */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "flex-start",
              }}
            >
              New Members
            </Text>
            <View style={styles.newMemberContainer}>
              <LineChart
                data={{
                  labels: [
                    "Ja",
                    "Fe",
                    "Mr",
                    "Ap",
                    "Ma",
                    "Jn",
                    "Jl",
                    "Ag",
                    "Sp",
                    "Ot",
                    "Nv",
                    "Dc",
                  ],
                  datasets: [
                    {
                      data: monthlyUserCheck
                        ? monthlyUserCount
                        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 40} // from react-native
                height={220}
                yAxisSuffix=""
                yAxisInterval={5} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: `#add8e6`,
                  backgroundGradientFrom: "skyblue",
                  backgroundGradientTo: "powderblue",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
            {/* <TouchableOpacity onPress={() => logoutUser()}>
              <Text>Logout</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    alignItems: "center",
    minWidth: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
    height: "100%",
  },
  totalRevenueContainer: {
    flex: 0,
    backgroundColor: `white`,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "auto",
    width: "100%",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    marginVertical: 15,
    overflow: "hidden",
  },
  newMemberContainer: {
    // backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 10,
  },
  statsHeading: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 20,
  },
});

export default Dashboard;
