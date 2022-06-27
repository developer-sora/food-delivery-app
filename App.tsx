import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, View, Button, Pressable } from "react-native";

type RootStackParamList = {
  Home: undefined; // 파라미터가 없으면 undefined
  Details: { itemId: number; otherParam?: string };
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

function HomeScreen({ navigation }: HomeScreenProps) {
  const onClick = React.useCallback(() => {
    navigation.navigate("Details", {
      itemId: 86,
      otherParam: "anything you want here",
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Home Screen</Text>
      <Pressable // ios, android 동일
        onPress={onClick}
      >
        <Text>Go to Details</Text>
      </Pressable>
    </View>
  );
}

function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/*페이지들의 묶음*/}
        <Stack.Screen // 페이지
          name="Home"
          component={HomeScreen}
          options={{ title: "홈화면" }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        {/*<Stack.Screen name="Details">
          {props => <DetailsScreen {...props} />}
        </Stack.Screen>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
