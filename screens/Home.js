import React from "react";
import PDFReader from "rn-pdf-reader-js";

class Home extends React.Component {
  render() {

    return (
      <PDFReader
        source={{
          uri: "https://www.keepandshare.com/doc30/112022/kalender-versjon-2-pdf-162k?dn=y&dnad=y",
        }}
      />
    );
  }
}

export default Home;
