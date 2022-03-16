import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatGrid } from "react-native-super-grid";
import { useFonts, Abel_400Regular } from "@expo-google-fonts/abel";
import axios from "axios";
import { useEffect, useState } from "react";
import { dataStuff } from "./utils/apiFetch";

export default function App() {
  const [data, setData] = useState([]);
  const [rapper, setRapper] = useState("drake");
  const [switchFlip, setSwitchFlip] = useState(true);

  let [loaded] = useFonts({
    Abel_400Regular,
    Abel: require("./fonts/Abel-Regular.ttf"),
  });

  var options = {
    method: "GET",
    url: "https://genius.p.rapidapi.com/search",
    params: { q: `${rapper}` },
    headers: {
      "x-rapidapi-host": "genius.p.rapidapi.com",
      "x-rapidapi-key": "c899e26ce2msh026ef0e795b08b6p1c91dajsn63fcd078f421",
    },
  };

  useEffect(() => {
    // setData(dataStuff);
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.response.hits);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [switchFlip]);

  // rerun api pull

  const pullRapper = () => {
    setSwitchFlip(!switchFlip);
  };
  const artistName = data.map((d) => d.result.primary_artist.name)[0];

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.container}
      keyboardVerticalOffset={5}
    >
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontFamily: "Abel_400Regular",
            fontSize: 32,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {artistName}
        </Text>

        <View
          style={{
            maxHeight: Dimensions.get("window").height * 0.72,
            width: Dimensions.get("window").width,
            flexDirection: "row",
          }}
        >
          <FlatGrid
            itemDimension={180}
            data={data}
            spacing={0}
            fixed
            style={[styles.gridView, {}]}
            renderItem={({ item, index }) => {
              // randomColor
              const randomColor = `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`;

              // randomColorFix //

              const randomColorFix =
                randomColor.length === 6
                  ? `${randomColor}5`
                  : randomColor.length === 5
                  ? `${randomColor}55`
                  : randomColor;

              // invertColor //

              function invertColor(hex) {
                if (hex.indexOf("#") === 0) {
                  hex = hex.slice(1);
                }
                // convert 3-digit hex to 6-digits.
                if (hex.length === 3) {
                  hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                if (hex.length !== 6) {
                  console.warn("o well", hex);
                }
                // invert color components
                var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
                  g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
                  b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
                // pad each with zeros and return
                return "#" + padZero(r) + padZero(g) + padZero(b);
              }

              function padZero(str, len) {
                len = len || 2;
                var zeros = new Array(len).join("0");
                return (zeros + str).slice(-len);
              }
              const frameColor = invertColor(randomColorFix);

              var getContrast = function (hexcolor) {
                // If a leading # is provided, remove it
                if (hexcolor.slice(0, 1) === "#") {
                  hexcolor = hexcolor.slice(1);
                }

                // Convert to RGB value
                var r = parseInt(hexcolor.substr(0, 2), 16);
                var g = parseInt(hexcolor.substr(2, 2), 16);
                var b = parseInt(hexcolor.substr(4, 2), 16);

                // Get YIQ ratio
                var yiq = (r * 299 + g * 587 + b * 114) / 1000;

                // Check contrast
                return yiq >= 128 ? "black" : "white";
              };

              const textColor = getContrast(randomColorFix);

              return (
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 5,
                    width: 180,
                    height: 210,
                    backgroundColor: randomColor,
                    marginTop: 19,
                    shadowColor: frameColor,
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}
                >
                  <View
                    style={{
                      height: 130,
                      width: 130,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: textColor,
                      borderRadius: 10,
                      shadowColor: textColor,
                      shadowOffset: { width: -2, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.result.header_image_url,
                      }}
                      style={styles.imageStyle}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "Abel_400Regular",
                      fontSize: 22,
                      marginBottom: 10,
                      textAlign: "center",
                      color: textColor,
                      paddingHorizontal: 10,
                    }}
                  >
                    {item.result.title}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <LinearGradient
          style={{
            marginTop: 0,
            marginBottom: 15,
            position: "absolute",
            bottom: 0,
            width: Dimensions.get("window").width,
            justifyContent: "flex-start",
            alignItems: "center",
            height: 690,
            backgroundColor: "white",
            zIndex: 99,
            transform: [{ translateY: 569 }],
            paddingTop: 40,
          }}
          colors={["rgba(235, 235, 235, 0.8)", "black"]}
        >
          <TextInput
            onChangeText={(value) => setRapper(value)}
            style={{
              backgroundColor: "#ffffff",
              paddingHorizontal: 20,
              marginTop: 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              paddingVertical: 10,
              paddingHorizontal: 90,
              borderRadius: 3,
              fontFamily: "Abel_400Regular",
              fontSize: 25,
            }}
            placeholder="Drake"
            placeholderTextColor="gray"
            onSubmitEditing={(value) => pullRapper(value.nativeEvent.text)}
          />
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(235, 235, 235, 0.8)",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gridView: {
    flex: 1,
  },
  imageStyle: { height: 120, width: 120, borderRadius: 10 },
});
