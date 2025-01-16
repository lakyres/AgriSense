import { useSignUp } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

interface FormState {
  email: string;
  password: string;
}

interface VerificationState {
  state: "default" | "pending" | "failed";
  error: string;
  code: string;
}

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState<VerificationState>({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded || !signUp) {
      Alert.alert("Error", "Clerk is not ready. Please try again later.");
      return;
    }

    if (!form.email || !form.password) {
      return Alert.alert(
        "Incomplete Information",
        "Email and password fields must be completed.",
      );
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification((prev) => ({
        ...prev,
        state: "pending",
      }));
    } catch (error: any) {
      console.error("Sign-up error:", error);
      const errorMessage =
        error.errors?.[0]?.longMessage || "An unknown error occurred.";
      Alert.alert("Error", errorMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded || !signUp) {
      Alert.alert("Error", "Clerk is not ready. Please try again later.");
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setShowSuccessModal(true);
      } else {
        setVerification((prev) => ({
          ...prev,
          error: "Verification failed. Please try again.",
          state: "failed",
        }));
      }
    } catch (err) {
      console.error("Verification error:", err);
      setVerification((prev) => ({
        ...prev,
        error: "Verification failed. Please try again.",
        state: "failed",
      }));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white mt-[50px]">
        <Text className="text-3xl text-black font-bold text-center mt-10">
          Let`s get started!
        </Text>
        <Text className="text-base text-general-200 text-center">
          Create an account to get started.
        </Text>

        <View className="p-5 mt-[50px]">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, email: value }))
            }
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            rightIcon={icons.eyecross}
            secureTextEntry={!passwordVisible}
            textContentType="password"
            value={form.password}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
            onRightIconPress={() => setPasswordVisible(!passwordVisible)}
            rightIconStyle={`opacity-${passwordVisible ? "100" : "50"}`}
          />

          <CustomButton
            title="Sign Up"
            onPress={handleSignUp}
            className="mt-[120px]"
          />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>

        {/* Verification Modal */}
        <ReactNativeModal isVisible={verification.state === "pending"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-bold text-2xl mb-2">Verification</Text>
            <Text className="mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label="Verification Code"
              placeholder="Enter code"
              icon={icons.lock}
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(value) =>
                setVerification((prev) => ({
                  ...prev,
                  code: value,
                }))
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        {/* Success Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[200px]">
            <Text className="text-3xl font-bold text-center">Verified</Text>
            <Text className="text-base text-gray-400 text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Continue"
              className="mt-5"
              onPress={() => router.push("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
