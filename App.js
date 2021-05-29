import React, { useState } from "react";
import { Image } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import Screens from "./navigation/Screens";
import { Images, EventList, MelhusTheme } from "./constants";

// cache app images
const assetImages = [Images.Logo];

// cache product images
EventList.map((event) => assetImages.push(event.image));

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default (props) => {
  const [isLoadingComplete, setLoading] = useState(false);
  const _loadResourcesAsync = () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  function _handleLoadingError(error) {
    console.warn(error);
  }

  function _handleFinishLoading() {
    setLoading(true);
  }

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    );
  }
};
