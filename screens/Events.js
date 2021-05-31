import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { Block, theme } from "galio-framework";
import { Card } from "../components";
import { initLanguage } from "../scripts/language";

const { width } = Dimensions.get("screen");

class Events extends React.Component {
  state = {
    language: "NO",
  };
  async componentDidMount() {
    let language = await initLanguage();
    this.setState({ language: language });
  }

  renderEvents = () => {
    const { events } = this.props;
    
    const { language } = this.state;
    let tempElement = null;
    let i = 0;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.events}>
        <Block flex>
          {events.map((element) => {
            if (element.block || tempElement != null) {
              if (tempElement == null) {
                tempElement = element;
                return;
              }
              let firstElement = tempElement;
              tempElement = null;
              return (
                <Block key={i++} flex row>
                  <Card
                    item={firstElement}
                    style={{ marginRight: theme.SIZES.BASE }}
                    key={i++}
                    language={language}
                  />
                  <Card item={element} key={i++} language={language} />
                </Block>
              );
            }
            return <Card item={element} key={i++} language={language} />;
          })}
        </Block>
      </ScrollView>
    );
  };

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
