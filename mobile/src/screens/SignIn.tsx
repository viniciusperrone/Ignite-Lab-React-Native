import { useState } from "react";
import { Alert } from "react-native";
import { Heading, Icon, useTheme, VStack } from "native-base";
import auth from "@react-native-firebase/auth";
import { Envelope, Key } from "phosphor-react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { IUserLogin } from "@shared/interfaces";
import Logo from "assets/logo_primary.svg";

export function SignIn() {
  const [user, setUser] = useState<IUserLogin>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colors } = useTheme();

  function onChange(value: string, name: string) {
    setUser({ [name]: value, ...user });
  }

  function handleSignIn() {
    const { email, password } = user;

    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha.");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido");
        }

        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          return Alert.alert("Entrar", "E-mail ou senha inválido");
        }

        return Alert.alert("Entrar", "Não foi possível acessar");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acessar sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        value={user.email}
        onChangeText={(e) => onChange(e, "email")}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        value={user.password}
        onChangeText={(e) => onChange(e, "password")}
      />
      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
