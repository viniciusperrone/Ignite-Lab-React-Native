import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { HStack, VStack, useTheme, Text, ScrollView, Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from "phosphor-react-native";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { CardDetails } from "@components/CardDetails";

import { dateFormat } from "src/utils/firestoreDateFormat";
import { IOrderDetails } from "@shared/interfaces";
import { OrderFirestore, RouterParams } from "@shared/types";

export function Details() {
  const [solution, setSolution] = useState<string>();
  const [order, setOrder] = useState<IOrderDetails>({} as IOrderDetails);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRoute();
  const { orderId } = router.params as RouterParams;
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  function handleOrderClose() {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Informa a solução para encerrar a solicitação"
      );
    }

    firestore()
      .collection<OrderFirestore>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação encerrada");
        goBack();
      })
      .catch(() => {
        Alert.alert("Solicitação", "Não foi possível encerrar a solicitação");
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestore>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          id,
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data() as OrderFirestore;

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);
  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="solicitação" />
      </Box>
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Património ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={Clipboard}
          footer={order.when}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              bg="gray.700"
              placeholder="Descrição da solução"
              textAlignVertical="top"
              multiline
              h={24}
              onChangeText={(e) => setSolution(e)}
              value={solution}
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button
          title="Encerrar solicitação"
          mt={5}
          onPress={handleOrderClose}
        />
      )}
    </VStack>
  );
}
