import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import InstagramEmbed from "react-instagram-embed";

class Home extends React.Component {
  render() {
    return (
      <PDFReader
        source={{
          uri: "http://www.africau.edu/images/default/sample.pdf",
        }}
      />
    );
  }
}

export default Home;
