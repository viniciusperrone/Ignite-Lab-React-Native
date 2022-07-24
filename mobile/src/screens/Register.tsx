import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { IRequest } from "@shared/interfaces";

export function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<IRequest>({} as IRequest);

  const { goBack } = useNavigation();

  function onChange(value: string, name: string) {
    setRequest({ [name]: value, ...request });
  }
  function handleNewOrderRegister() {
    const { patrimony, description } = request;

    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        ...request,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso");
        goBack();
      })
      .catch((error) => {
        return Alert.alert("Solcitação", "Não foi possível registrar o pedido");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <VStack flex={1} bg="gray.600">
      <Header title="Nova solicitação" />
      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={(e) => onChange(e, "patrimony")}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={(e) => onChange(e, "description")}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
