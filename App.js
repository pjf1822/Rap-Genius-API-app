import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { dataStuff } from "./utils/apiFetch";

export default function App() {
  const [data, setData] = useState([]);
  const [rapper, setRapper] = useState("drake");
  const [switchFlip, setSwitchFlip] = useState(true);

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

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 200,
          width: Dimensions.get("window").width,
          flex: 1,
          flexDirection: "row",
        }}
      >
        {data.map((d) => {
          const imagething = d.result.song_art_image_thumbnail_url;
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: `#${randomColor}`,
              }}
              key={d.id}
            >
              <Text>{d.result.full_title}</Text>
              <Image
                source={{
                  uri: imagething,
                }}
                style={styles.imageStyle}
              />
            </View>
          );
        })}
      </View>
      <View>
        <TextInput
          onChangeText={(value) => setRapper(value)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
          onSubmitEditing={(value) => pullRapper(value.nativeEvent.text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: { height: 50, width: 50 },
});
