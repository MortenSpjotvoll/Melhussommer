import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { EventList, Filters } from "../constants";

// screens
import Home from "../screens/Home";
import Events from "../screens/Events";
import CustomDrawerContent from "./Menu";

// header for screens
import { Header } from "../components";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
let e = EventList;
let curTab = null;
let curSearch = null;

function Filter(id, text) {
  curSearch = text;
  curTab = id;
  if (id === null) {
    e = EventList;
  } else {
    Filters.forEach((filter) => {
      if (id === filter.id) {
        e = EventList.filter(
          (x) =>
            x[filter.category] === filter.title ||
            x[filter.category].includes(filter.title)
        );
      }
    });
  }

  if (text !== null && text !== "") {
    e = e.filter((x) => {
      return x.title
        .toString()
        .toLowerCase()
        .includes(text.toString().toLowerCase());
    });
  }
}

function EventsStack(props) {
  const EventComponent = (props) => <Events {...props} events={e} />;

  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Events"
        component={EventComponent}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              tabs={Filters}
              title="Events"
              navigation={navigation}
              scene={scene}
              filter={Filter}
              curTab={curTab}
              curSearch={curSearch}
              search
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Events" component={EventsStack} />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
