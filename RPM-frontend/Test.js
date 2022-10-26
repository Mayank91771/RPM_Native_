import react from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function Test() {
    return (
      <View style={styles.container}>
        <View>
          <CircularProgress
            value={60}
            radius={60}
            duration={1000}
            progressValueColor={"#ecf0f1"}
            maxValue={200}
            title={"KM/H"}
            titleColor={"black"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
      </View>
    );
  }

  {/* <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="blue"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <SafeAreaView>
          <ScrollView>
            <View style={styles.mainContainer}>
              <Stack.Navigator intialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{ title: "Dashboard" }}
                />
              </Stack.Navigator>
              {/* <LoginScreen /> */}
        //       </View>
        //       </ScrollView>
        //     </SafeAreaView>
        //   </NavigationContainer> */}