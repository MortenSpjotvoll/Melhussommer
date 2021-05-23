import React from "react";
import { withNavigation } from "@react-navigation/compat";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { Block, NavBar, theme } from "galio-framework";
import { Entypo } from "@expo/vector-icons";
import Tabs from "./Tabs";
import { Input } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";

import MelhusTheme from "../constants/Theme";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  renderSearch = () => {
    const { navigation, filter, curTab } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Søk"
        placeholderTextColor={"#8898AA"}
        onChangeText={(text) => {
          navigation.setParams({ tabId: null });
          filter && filter(curTab, text);
        }}
        iconContent={
          <AntDesign
            name="search1"
            size={16}
            color={MelhusTheme.COLORS.MUTED}
          />
        }
      />
    );
  };

  renderTabs = () => {
    const { tabs, navigation, filter, curSearch } = this.props;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        onChange={(id) => {
          navigation.setParams({ tabId: id });
          filter(id, curSearch);
        }}
      />
    );
  };

  renderHeader = () => {
    const { tabs } = this.props;
    if (tabs) {
      return <Block center>{tabs ? this.renderTabs() : null}</Block>;
    }
  };

  render() {
    const {
      back,
      title,
      search,
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
                (white ? MelhusTheme.COLORS.WHITE : MelhusTheme.COLORS.ICON)
              }
              style={{ marginTop: 2 }}
            />
          }
          right={search ? this.renderSearch() : null}
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: MelhusTheme.COLORS[white ? "WHITE" : "HEADER"] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    height: 36,
    width: width - 200,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: MelhusTheme.COLORS.BORDER,
    left: 0,
    marginRight: 120,
  },
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
    backgroundColor: MelhusTheme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  header: {
    backgroundColor: MelhusTheme.COLORS.WHITE,
  },
});

export default withNavigation(Header);
