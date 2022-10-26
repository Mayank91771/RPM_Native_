import { useEffect, useState, React } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Print from "expo-print";
import axios from "axios";
import { DataTable } from "react-native-paper";
import { localHost } from "../config";
import { useSelector } from "react-redux";
import DatePicker from "react-native-neat-date-picker";
import moment from "moment";

export function Financial() {
  const loggedInAcademy = useSelector((state) => state.loggedInAcademy);

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    getMontlyData();
  }, []);

  const getMontlyData = async () => {
    const today = new Date();
    try {
      console.log("Before attendance");
      const { data } = await axios.get(
        `${localHost}api/users/get-member-report/${loggedInAcademy}`
      );
      setDataTable(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      await Print.printAsync({
        html: tableData(),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const tableData = () => {
    var table = "";
    var count = 0;
    for (let i in dataTable) {
      const item = dataTable[i];
      table =
        table +
        `
      <tr>
        <td>${item._id}</td>
        <td>${item.firstName} ${item.lastName}</td>
        <td>$100</td>
      </tr>
      `;
      count = count + 100;
    }
    console.log(table);
    const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello to RPM DEMO!
    </h1>
  
   <table>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>UserName</th>
    </tr>
    ${table}
  </table>
  <p style="text-align: start; "><b>Total: ${count}<b></p>
  </body>
  </html>
  `;

    return html;
  };

  return (
    <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
      <DataTable.Header>
        <DataTable.Title>Id</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Membership</DataTable.Title>
      </DataTable.Header>

      {dataTable?.map((item) => (
        <DataTable key={item._id}>
          <DataTable.Row>
            <DataTable.Cell>{item._id.slice(0, 12)}</DataTable.Cell>
            <DataTable.Cell>
              {item.firstName} {item.lastName}
            </DataTable.Cell>
            <DataTable.Cell>$100</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      ))}

      <DataTable.Row></DataTable.Row>
      <TouchableOpacity onPress={print}>
        <Text
          style={{
            fontSize: 16,
            backgroundColor: "powderblue",
            color: "red",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          Generate PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function Attendance() {
  const loggedInAcademy = useSelector((state) => state.loggedInAcademy);

  const [dataTable, setDataTable] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);

  useEffect(() => {
    getAttendanceData();
    console.log("Nayi date checkinh", date);
  }, [date]);

  const getAttendanceData = async () => {
    try {
      setApiSuccess(false);
      console.log("Before attendance");
      const { data } = await axios.get(
        `${localHost}api/users/get-member-attendance/${date}/${loggedInAcademy}`
      );
      console.log("member data", data);

      setDataTable(data.memberAttendance);
      setApiSuccess(true);
      //   Alert.alert("Success", "Attendance has been submitted");
    } catch (err) {
      console.log(err.message);
      //   Alert.alert("", "Attendance has already been submitted for today.");
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCan = () => {
    setShowDatePicker(false);
  };

  const onConf = (date) => {
    setShowDatePicker(false);
    // setDate(date);
    const momentDate = moment(date).format("YYYY-MM-DD");
    setDate(momentDate);
  };

  const print = async () => {
    try {
      await Print.printAsync({
        html: tableData(),
        // printerUrl: selectedPrinter?.url,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const tableData = () => {
    var table = "";
    for (let i in dataTable) {
      const item = dataTable[i];
      table =
        table +
        `
      <tr>
        <td>${item._id.slice(0, 12)}</td>
        <td>${item.firstName}</td>
        <td>${item.isChecked ? "Present" : "Absent"}</td>
      </tr>
      `;
    }
    console.log(table);
    const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello to RPM DEMO!
    </h1>
  
   <table>
    <tr>
      <th style="margin-right: 10px">Id</th>
      <th style="margin-right: 10px">Name</th>
      <th>UserName</th>
    </tr>
    ${table}
  </table>
  </body>
  </html>
  `;

    return html;
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.dateArea}>
        <TextInput
          value={date}
          style={{ height: 30, width: "35%", marginLeft: 10 }}
        />
        <TouchableOpacity onPress={openDatePicker}>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "powderblue",
              color: "red",
            }}
          >
            Modify Date
          </Text>
        </TouchableOpacity>
        <DatePicker
          isVisible={showDatePicker}
          mode={"single"}
          onCancel={onCan}
          onConfirm={(e) => onConf(e.date)}
        />
      </View>
      <DataTable.Header>
        <DataTable.Title>Id</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Attendance</DataTable.Title>
      </DataTable.Header>
      {apiSuccess &&
        dataTable?.map((item) => (
          <DataTable key={item._id}>
            <DataTable.Row>
              <DataTable.Cell>{item._id.slice(0, 12)}</DataTable.Cell>
              <DataTable.Cell>
                {item.firstName} {item.lastName}
              </DataTable.Cell>
              <DataTable.Cell>
                {item.isChecked ? "Present" : "Absent"}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ))}
      <TouchableOpacity onPress={print}>
        <Text
          style={{
            fontSize: 16,
            backgroundColor: "powderblue",
            color: "red",
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          Generate PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dateArea: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginVertical: 15,
  },
});

// const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Financial"
//       screenOptions={{
//         tabBarActiveTintColor: "#e91e63",
//         tabBarLabelStyle: { fontSize: 12 },
//         tabBarStyle: { backgroundColor: "powderblue" },
//       }}
//       independent={true}
//     >
//       <Tab.Screen
//         name="Financial"
//         component={Financial}
//         options={{ tabBarLabel: "Financials" }}
//       />
//       <Tab.Screen
//         name="Attendance"
//         component={Attendance}
//         options={{ tabBarLabel: "Attendance" }}
//       />
//     </Tab.Navigator>
//   );
// }
