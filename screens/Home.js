import React from "react";
import { Image, Dimensions } from "react-native";
import Images from "../constants/Images";
import ImageZoom from 'react-native-image-pan-zoom';

class Home extends React.Component {
  render() {
    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 2339 / 1654);
    const imageWidth = dimensions.width;
    return (
      <ImageZoom cropWidth={dimensions.width}
        cropHeight={imageHeight}
        imageWidth={imageWidth}
        centerOn={{ x: 0, y: 0, scale: 1, duration: 0 }}
        imageHeight={imageHeight}>
        <Image style={{ width: imageWidth, height: imageHeight }}
          source={Images.overviewPDF} />
      </ImageZoom>
    );
  }
}

export default Home;
