import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { Block, theme } from "galio-framework";
import { events } from "../constants";
import { Card } from "../components";

const { width } = Dimensions.get("screen");

class Events extends React.Component {
  renderEvents = () => {
    let tempElement = null;
    let i = 0;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.events}>
        <Block flex>
          {events.map(element => {
            if(element.block || tempElement != null) {
              if(tempElement == null) {
                tempElement = element;
                return;
              }
              let firstElement = tempElement;
              tempElement = null;
              return  (<Block key={i++} flex row>
                <Card item={firstElement} style={{ marginRight: theme.SIZES.BASE }} key={i++} />
                <Card item={element} key={i++} />
              </Block>)
            }
            return <Card item={element} key={i++}  />
          })}
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderEvents()}
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  events: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Events;
