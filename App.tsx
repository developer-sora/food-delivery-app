import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import AppInner from "./AppInner";

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string }; //파라미터
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
//로그인 안했을 때 페이지 이동을 막기 위해 나눠서 선언함

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
