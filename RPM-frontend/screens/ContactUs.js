import { React } from "react";
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
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ContactUs() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Contact Us</Text>
        <View style={styles.fields}>
          <Ionicons
            name="mail-sharp"
            color="skyblue"
            size={20}
            style={styles.icons}
          />
          <Text style={styles.textFields}>rpmcustomercare@gmail.com</Text>
        </View>
        <View style={styles.fields}>
          <Ionicons
            name="call-sharp"
            color="skyblue"
            size={20}
            style={styles.icons}
          />
          <Text style={styles.textFields}>+1 (647)887-7894</Text>
        </View>
        <View style={styles.fields}>
          <Ionicons
            name="location"
            color="skyblue"
            size={20}
            style={styles.icons}
          />
          <Text style={styles.textFields}>
            100 Jhon Doe Street East. Waterloo, ON - N2L 8G7
          </Text>
        </View>
        <View style={styles.fields}>
          <Ionicons
            name="logo-facebook"
            color="skyblue"
            size={20}
            style={styles.icons}
          />
          <Text style={styles.textFields}>rpmcustomercare</Text>
        </View>
        <View style={styles.fields}>
          <Ionicons
            name="logo-twitter"
            color="skyblue"
            size={20}
            style={styles.icons}
          />
          <Text style={styles.textFields}>RevenuePerMonth</Text>
        </View>
        <View style={styles.fields}>
          <Ionicons
            name="logo-instagram"
            color="skyblue"
            size={20}
            style={styles.icons}
          />
          <Text style={styles.textFields}>revenue_per_month</Text>
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
    // paddingVertical: "20%",
    // paddingHorizontal: "10%",
    height: "95%",
    width: "95%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  mainHeading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: "10%",
    textDecorationLine: "underline",
  },
  fields: {
    flexDirection: "row",
    marginVertical: "2%",
  },
  icons: {
    width: "20%",
    textAlign: "center",
  },
  textFields: {
    width: "75%",
    fontSize: 16,
  },
});
