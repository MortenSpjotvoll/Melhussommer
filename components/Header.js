import React from "react";
import { withNavigation } from "@react-navigation/compat";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { Block, NavBar, theme } from "galio-framework";
import { Entypo } from "@expo/vector-icons";

import melhusTheme from "../constants/Theme";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <Block>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          rightStyle={{ alignItems: "center" }}
          left={
            <Entypo
              name={back ? "chevron-left" : "menu"}
              size={20}
              onPress={this.handleLeftPress}
              color={
                iconColor ||
                (white ? melhusTheme.COLORS.WHITE : melhusTheme.COLORS.ICON)
              }
              style={{ marginTop: 2 }}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: melhusTheme.COLORS[white ? "WHITE" : "HEADER"] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: melhusTheme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  header: {
    backgroundColor: melhusTheme.COLORS.WHITE,
  },
});

export default withNavigation(Header);
