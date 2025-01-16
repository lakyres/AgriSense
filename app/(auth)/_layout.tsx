import { Stack } from "expo-router";
import { FormProvider } from "@/app/(auth)/FormContext";

const AuthLayout = () => {
  return (
    <FormProvider>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
    </FormProvider>
  );
};

export default AuthLayout;
