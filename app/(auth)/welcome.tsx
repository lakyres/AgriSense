import { useRouter, Href } from "expo-router"; // Import Href type
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Home = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* Swiper Section */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#000000] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-13 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-12 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Button Section */}
      {isFirstSlide && (
        <CustomButton
          title="Let’s Get Started"
          onPress={() => swiperRef.current?.scrollBy(1)}
          className="w-11/12 mt-10 mb-5 bg-green-700"
        />
      )}

      {!isFirstSlide && !isLastSlide && (
        <CustomButton
          title="Continue"
          onPress={() => swiperRef.current?.scrollBy(1)}
          className="w-11/12 mt-10 mb-5 bg-green-600"
        />
      )}

      {isLastSlide && (
        <CustomButton
          title="Create Account"
          onPress={() => router.replace("/(auth)/sign-up" as Href)}
          className="w-11/12 mt-10 mb-5 bg-green-500"
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
