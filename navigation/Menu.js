import React, { useState, useCallback, useReducer } from "react";
import { ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Images from "../constants/Images";
import { DrawerItem } from "../components";
import { initLanguage, storeLanguageSelection } from "../scripts/language";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  focused,
  state,
  ...rest
}) {
  const screens = ["Home", "Events"];
  const links = ["Instagram", "Facebook", "TikTok", "Homepage"];
  const [language, setLanguage] = useState("");
  const test = async () => {
    const l = await initLanguage();
    setLanguage(l);
  };
  test();
  const setNO = async () => {
    await storeLanguageSelection("NO");
    setLanguage("NO");
  };

  const setEN = async () => {
    await storeLanguageSelection("EN");
    setLanguage("EN");
  };
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}>
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
      </Block>

      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerItem
                title={item}
                language={language}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text>{language == "EN" ? "Social media" : "Sosiale medier"}</Text>
          </Block>
          {links.map((item, index) => {
            return (
              <DrawerItem
                title={item}
                key={index}
                language={language}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
      </Block>
      <Block flex={0.06} style={styles.flags}>
        <TouchableOpacity onPress={setNO}>
          <Image source={Images.FlagNO} style={styles.flag} />
        </TouchableOpacity>
        <TouchableOpacity onPress={setEN}>
          <Image source={Images.FlagUS} style={styles.flag} />
        </TouchableOpacity>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flag: {
    width: 36,
    height: 24,
    padding: 10,
    marginRight: 10,
  },
  flags: {
    flexDirection: "row",
    paddingHorizontal: 28,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;
