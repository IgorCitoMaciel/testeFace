import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Pagina Home!</Text>
      <Button
        title="Tela Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
