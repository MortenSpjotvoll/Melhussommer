import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import MelhusTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;
    const iconSize = 18;

    switch (title) {
      case "Home":
        return (
          <Entypo
            name="home"
            size={iconSize}
            color={focused ? "white" : MelhusTheme.COLORS.PRIMARY}
          />
        );

      case "Events":
        return (
          <MaterialIcons
            name="event"
            size={iconSize}
            color={focused ? "white" : MelhusTheme.COLORS.PRIMARY}
          />
        );

      case "Instagram":
        return (
          <AntDesign
            name="instagram"
            size={iconSize}
            color={focused ? "white" : MelhusTheme.COLORS.PRIMARY}
          />
        );

      case "Facebook":
        return (
          <Entypo
            name="facebook"
            size={iconSize}
            color={focused ? "white" : MelhusTheme.COLORS.PRIMARY}
          />
        );

      case "TikTok":
        return (
          <MaterialIcons
            name="music-note"
            size={iconSize}
            color={focused ? "white" : MelhusTheme.COLORS.PRIMARY}
          />
        );

      case "Homepage":
        return (
          <MaterialCommunityIcons
            name="web"
            size={iconSize}
            color={focused ? "white" : MelhusTheme.COLORS.PRIMARY}
          />
        );
      default:
        return null;
    }
  };

  getExternalLink(title) {
    switch (title) {
      case "Instagram":
        return "https://www.instagram.com/ukmmelhus/";

      case "Facebook":
        return "fb://facewebmodal/f?href=https://www.facebook.com/ukmmelhus/";

      case "TikTok":
        return "https://www.tiktok.com/@ukmmelhus/";

      case "Homepage":
        return "https://ukm.no/melhus/";
      default:
        return null;
    }
  }

  getTranslatedTitle(title) {
    switch (title) {
      case "Home":
        return "Hjem";

      case "Events":
        return "Arrangementer";

      case "Homepage":
        return "Hjemmesiden";
      default:
        return title;
    }
  }

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];
    const externalLink = this.getExternalLink(title);

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          externalLink !== null
            ? Linking.openURL(externalLink).catch((err) =>
                console.error("An error occurred", err)
              )
            : navigation.navigate(title)
        }>
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={16}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.75)"}>
              {this.getTranslatedTitle(title)}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: MelhusTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: MelhusTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
