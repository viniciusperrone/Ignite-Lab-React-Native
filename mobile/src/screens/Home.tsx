import { useState } from "react";
import {
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
  FlatList,
  Center,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Order } from "@components/Order";

import { IOrder } from "@shared/interfaces";
import Logo from "assets/logo_secondary.svg";

export function Home() {
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<IOrder[]>([
    {
      id: "123",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "123",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "123",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
  ]);
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  function handleNewOrder() {
    navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigate("details", { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("Sair", "Error. tente novamente");
      });
  }

  return (
    <VStack>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack>
        <HStack
          w="full"
          mt={8}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="gray.200">3</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui{"\n"}
                solicitações{" "}
                {statusSelected === "open" ? "em andamento" : "finalizadas"}
              </Text>
            </Center>
          )}
        />

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
