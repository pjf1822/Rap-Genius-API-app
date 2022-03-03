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

import { FlatGrid } from "react-native-super-grid";
import { useFonts, Abel_400Regular } from "@expo-google-fonts/abel";

import axios from "axios";
import { useEffect, useState } from "react";
import { dataStuff } from "./utils/apiFetch";

export default function App() {
  const [data, setData] = useState([]);
  const [rapper, setRapper] = useState("drake");
  const [switchFlip, setSwitchFlip] = useState(true);
  let fontStuff = useFonts({
    Abel_400Regular,
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
    setData(dataStuff);
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     setData(response.data.response.hits);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
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
            fontSize: 30,
          }}
        >
          {artistName}
        </Text>
        <View
          style={{
            maxHeight: Dimensions.get("window").height * 0.7,
            width: Dimensions.get("window").width,
            flexDirection: "row",
          }}
        >
          <FlatGrid
            itemDimension={180}
            data={data}
            spacing={0}
            fixed
            style={styles.gridView}
            renderItem={({ item }) => {
              let randomColor = Math.floor(Math.random() * 16777215).toString(
                16
              );

              return (
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 5,
                    width: 180,
                    height: 200,
                    backgroundColor: `#${randomColor}`,
                    marginTop: 19,
                  }}
                >
                  <Image
                    source={{
                      uri: item.result.header_image_url,
                    }}
                    style={styles.imageStyle}
                  />
                  <Text
                    style={{
                      fontFamily: "Abel_400Regular",
                      fontSize: 22,
                      marginBottom: 10,
                    }}
                  >
                    {item.result.title}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            marginTop: 0,
            marginBottom: 15,
            position: "absolute",
            bottom: 0,
            width: Dimensions.get("window").width,
            justifyContent: "flex-start",
            alignItems: "center",
            height: 700,
            backgroundColor: "white",
            zIndex: 99,
            transform: [{ translateY: 600 }],
            paddingTop: 30,
          }}
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
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  gridView: {
    marginTop: -40,
    flex: 1,
  },
  imageStyle: { height: 120, width: 120 },
});
