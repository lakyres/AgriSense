import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter(); // Use the router to navigate programmatically

  // Dummy Data
  const [headerMessage, setHeaderMessage] = useState("Welcome, User!");
  const [plantHealth, setPlantHealth] = useState("Good");
  const [growthStageData, setGrowthStageData] = useState({
    currentStage: "Vegetative",
    progress: 50,
    daysToNextStage: 15,
  });
  const [pestStatus, setPestStatus] = useState({
    status: "No pests detected",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update data every 5 seconds
      setHeaderMessage(
        [
          "Welcome, User!",
          "Hello, Farmer!",
          "Good to see you again!",
          "Let's grow!",
        ][Math.floor(Math.random() * 4)],
      );

      setPlantHealth(
        ["Good", "Fair", "Excellent", "Poor"][Math.floor(Math.random() * 4)],
      );

      setGrowthStageData({
        currentStage: ["Seedling", "Vegetative", "Flowering", "Harvest"][
          Math.floor(Math.random() * 4)
        ],
        progress: Math.floor(Math.random() * 100),
        daysToNextStage: Math.floor(Math.random() * 30),
      });

      setPestStatus({
        status: [
          "No pests detected",
          "Mild infestation detected",
          "Severe infestation detected",
        ][Math.floor(Math.random() * 3)],
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Render Header Section
  const renderHeader = () => (
    <View className="flex-row justify-between items-center mb-5">
      <Text className="text-2xl font-bold text-black">{headerMessage}</Text>
      <TouchableOpacity>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          className="w-10 h-10 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );

  // Render Plant Profile Section
  const renderPlantProfile = () => (
    <View className="bg-gray-100 rounded-lg p-4 mb-5 shadow-sm">
      <View className="flex-row items-center">
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          className="w-20 h-20 rounded-lg"
        />
        <View className="ml-4">
          <Text className="text-xl font-semibold text-black">Pechay Plant</Text>
          <Text className="text-gray-500">Health: {plantHealth}</Text>
        </View>
      </View>
    </View>
  );

  // Render Growth Stage Section
  const renderGrowthStage = () => (
    <View className="bg-green-100 rounded-lg p-4 mb-5 shadow-sm">
      <Text className="text-lg font-bold text-green-700">Growth Stage</Text>
      <Text className="text-base text-black mt-2">
        Current Stage:{" "}
        <Text className="font-semibold">{growthStageData.currentStage}</Text>
      </Text>
      <View className="bg-gray-300 h-2 rounded-full mt-2">
        <View
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${growthStageData.progress}%` }}
        ></View>
      </View>
      <Text className="text-gray-500 mt-2">
        {growthStageData.daysToNextStage} days to the next stage
      </Text>
    </View>
  );

  // Render Pest Status Section
  const renderPestStatus = () => (
    <View className="bg-red-100 rounded-lg p-4 mb-5 shadow-sm">
      <Text className="text-lg font-bold text-red-700">Pest Status</Text>
      <Text className="text-base text-black mt-2">
        Status: <Text className="font-semibold">{pestStatus.status}</Text>
      </Text>
      <TouchableOpacity className="mt-3 bg-red-700 py-2 px-4 rounded-lg">
        <Text className="text-white text-center">View Details</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Quick Actions Section
  const renderQuickActions = () => (
    <View className="flex-row justify-between mt-5">
      <TouchableOpacity className="bg-blue-500 flex-1 py-3 mx-1 rounded-lg">
        <Text className="text-white text-center">Manual Spray</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-800 flex-1 py-3 mx-1 rounded-lg"
        onPress={() => router.push("/(root)/(tabs)/dashboard")}
      >
        <Text className="text-white text-center">Dashboard</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white p-5">
      {renderHeader()}
      {renderPlantProfile()}
      {renderGrowthStage()}
      {renderPestStatus()}
      {renderQuickActions()}
    </ScrollView>
  );
};

export default HomeScreen;
