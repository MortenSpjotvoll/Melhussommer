import React from "react";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Block, Text, theme } from "galio-framework";
import * as WebBrowser from "expo-web-browser";
import { MelhusTheme } from "../constants";

class Card extends React.Component {
  render() {
    const { item, style, ctaColor, language } = this.props;
    const isEnglish = language == "EN";
    var dict = {};
    dict["01"] = "Jan";
    dict["02"] = "Feb";
    dict["03"] = "Mar";
    dict["04"] = "Apr";
    dict["05"] = isEnglish ? "May" : "Mai";
    dict["06"] = "Jun";
    dict["07"] = "Jul";
    dict["08"] = "Aug";
    dict["09"] = "Sep";
    dict["10"] = isEnglish ? "Oct" : "Okt";
    dict["11"] = "Nov";
    dict["12"] = isEnglish ? "Dec" : "Des";
    const _handlePressButtonAsync = async () => {
      await WebBrowser.openBrowserAsync(item.url);
    };

    const cardContainer = [
      item.horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
      styles.card,
      style,
    ];

    const getDateDisplay = () => {
      if (typeof item.week !== "undefined" && item.week !== null && item.week !== "") {
        return (<Text style={styles.date}>
          {isEnglish ? "Week" : "Uke"}
          {"\n"}
          {item.week}
        </Text>)
      } else {
        return (<Text style={styles.date}>
          {item.date.substring(0, 2)}
          {"\n"}
          {dict[item.date.substring(3, 5)]}
        </Text>)
      }
    }

    return (
      <Block row={item.horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={_handlePressButtonAsync}>
          <Block
            flex
            style={
              item.horizontal ? styles.imageBlockVertical : styles.imageBlock
            }>
            <Image
              source={{ uri: item.image }}
              style={item.full ? styles.fullImage : styles.horizontalImage}
            />
            {getDateDisplay()}
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={_handlePressButtonAsync}>
          <Block flex style={styles.cardDescription}>
            <Text size={14} style={styles.cardMeta}>
              {item.time} | {item.place}
            </Text>

            <Text size={14} style={styles.cardTitle}>
              {isEnglish ? item.titleEN : item.titleNO}
            </Text>
            <Text
              style={styles.cardCta}
              size={12}
              muted={!ctaColor}
              color={ctaColor || MelhusTheme.COLORS.ACTIVE}
              bold>
              {isEnglish ? item.ctaEN : item.ctaNO}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  imageBlock: {
    flex: 0,
  },
  imageBlockVertical: {
    flex: 1,
  },
  date: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: MelhusTheme.COLORS.BLUE,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  card: {
    backgroundColor: MelhusTheme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
  },
  cardMeta: {
    fontStyle: "italic",
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    paddingBottom: 15,
  },
  cardCta: {
    position: "absolute",
    left: 6,
    bottom: 6,
  },
  cardDescription: {
    //flex: 10000,
    // alignContent: "flex-start",
    padding: theme.SIZES.BASE / 2,
  },
  fullImage: {
    height: 215,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  shadow: {
    shadowColor: MelhusTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);
