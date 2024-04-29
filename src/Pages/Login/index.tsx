import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export default function Login() {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvaiableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isBiometricEnrolled) {
      Alert.alert("Login", "Biometria não cadastrada");
      return;
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autenticação biometrica",
      fallbackLabel: "Biometria nao reconhecida",
    });
    if (auth.success) {
      setIsAuthenticated(true);
      navigation.navigate("Home");
    }
    console.log(auth);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pagina Login !</Text>
      <Button
        title="Tela Home"
        onPress={() => {
          handleAuthentication();
        }}
      />
      <StatusBar style="auto" />
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
});
