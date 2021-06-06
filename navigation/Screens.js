import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Filters } from "../constants";
import { initializeEvents } from "../scripts/events";

// screens
import Home from "../screens/Home";
import Events from "../screens/Events";
import CustomDrawerContent from "./Menu";

// header for screens
import { Header } from "../components";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
let e = initializeEvents();

let curTab = null;
let curSearch = null;

function Filter(id, text) {
  curSearch = text;
  
  if (id === null || curTab !== id) {
    e = initializeEvents();
  }
  if(id !== null) {
    Filters.forEach((filter) => {
      if (id === filter.id) {
        e = e.filter(
          (x) => 
            x[filter.category] === filter.titleNO ||
            x[filter.category].includes(filter.titleNO)
          
          );
        }
      });
    }
    
    curTab = id;
  if (text !== null && text !== "") {
    e = e.filter((x) => {
      return x.titleNO
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
          header: ({ navigation, scene, language }) => (
            <Header
              tabs={Filters}
              title="Events"
              navigation={navigation}
              scene={scene}
              filter={Filter}
              curTab={curTab}
              curSearch={curSearch}
              search
              language={language}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  //alert(JSON.stringify(props));
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene, language }) => (
            <Header
              title="Home"
              navigation={navigation}
              scene={scene}
              language={language}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  let language = props.language;
  let setLanguage = props.changeLanguage;
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          language={language}
          setLanguage={setLanguage}
        />
      )}
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
      initialRouteName="Events">
      <Drawer.Screen name="Home">
        {() => <HomeStack language={language} />}
      </Drawer.Screen>
      <Drawer.Screen name="Events">
        {() => <EventsStack {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function (props) {
  // alert(JSON.stringify(props));
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App">{() => <AppStack {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
}
