import { useState } from "react";
import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "assets/logo_primary.svg";

interface IUserLogin {
  email: string;
  password: string;
}

function SignIn() {
  const [user, setUser] = useState<IUserLogin>();
  const { colors } = useTheme();

  function onChange(value: string, name: string) {
    setUser({ [name]: value, ...user });
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
        onChangeText={(e) => onChange(e, "email")}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={(e) => onChange(e, "password")}
      />
      <Button title="Entrar" w="full" />
    </VStack>
  );
}

export default SignIn;
