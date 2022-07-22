import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { VStack } from "native-base";

export function Register() {
  return (
    <VStack flex={1} bg="gray.600">
      <Header title="Nova solicitação" />
      <Input placeholder="Número do patrimônio" mt={4} />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />

      <Button title="Cadastrar" mt={5} />
    </VStack>
  );
}
