import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import DismissKeyboardView from "../components/DismissKeyboardView";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

function SignIn({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text) => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback((text) => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(() => {
    Alert.alert("알림", "안녕~");
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate("SignUp");
  }, [navigation]);

  const canGoNext = email && password;
  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          placeholder="이메일을 입력해주세요."
          onChangeText={onChangeEmail}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false} // 패스워드로 이동해도 키보드 유지
          ref={emailRef}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          secureTextEntry
          onChangeText={onChangePassword}
          importantForAutofill="yes"
          autoComplete="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : [styles.loginButton, styles.loginButtonActive]
          }
          disabled={!canGoNext}
        >
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: "blue",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonZone: {
    alignItems: "center",
  },
});

export default SignIn;
