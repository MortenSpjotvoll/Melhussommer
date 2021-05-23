import React from "react";
import { StyleSheet, Dimensions, FlatList, Animated } from "react-native";
import { Block, theme } from "galio-framework";
import { Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");
import MelhusTheme from "../constants/Theme";

export default class Tabs extends React.Component {
  state = {
    active: null,
  };

  animatedValue = new Animated.Value(1);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // color not supported
    }).start();
  }

  menuRef = React.createRef();

  onScrollToIndexFailed = () => {
    this.menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5,
    });
  };

  selectMenu = (id) => {
    const active = this.state.active === id ? null : id;
    this.setState({ active: active });

    this.menuRef.current.scrollToIndex({
      index: this.props.data.findIndex((item) => item.id === id),
      viewPosition: 0.5,
    });

    this.animate();
    this.props.onChange && this.props.onChange(active);
  };

  renderItem = (item) => {
    const isActive = this.state.active === item.id;

    const textColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        MelhusTheme.COLORS.BLACK,
        isActive ? MelhusTheme.COLORS.WHITE : MelhusTheme.COLORS.BLACK,
      ],
      extrapolate: "clamp",
    });

    const containerStyles = [
      styles.titleContainer,
      !isActive && { backgroundColor: MelhusTheme.COLORS.SECONDARY },
      isActive && styles.containerShadow,
    ];

    return (
      <Block style={containerStyles}>
        <Animated.Text
          style={[styles.menuTitle, { color: textColor }]}
          onPress={() => this.selectMenu(item.id)}>
          {item.title}
          {isActive ? <Entypo name="cross" size={16} color="white" /> : null}
        </Animated.Text>
      </Block>
    );
  };

  renderMenu = () => {
    const { data, ...props } = this.props;

    return (
      <FlatList
        {...props}
        data={data}
        horizontal={true}
        ref={this.menuRef}
        extraData={this.state}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={this.onScrollToIndexFailed}
        renderItem={({ item }) => this.renderItem(item)}
        contentContainerStyle={styles.menu}
      />
    );
  };

  render() {
    return <Block style={styles.container}>{this.renderMenu()}</Block>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: theme.COLORS.WHITE,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: theme.SIZES.BASE * 2.5,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  titleContainer: {
    alignItems: "center",
    backgroundColor: MelhusTheme.COLORS.ACTIVE,
    borderRadius: 4,
    marginRight: 5,
  },
  containerShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menuTitle: {
    fontWeight: "600",
    fontSize: 14,
    // lineHeight: 28,
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: MelhusTheme.COLORS.MUTED,
  },
});
