import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";

const HistoryScreen = () => {
  // Sample data
  const [logs, setLogs] = useState([
    {
      id: "1",
      type: "Growth",
      message: "Stage progressed to Vegetative.",
      timestamp: "2025-01-14 10:00 AM",
    },
    {
      id: "2",
      type: "Pest",
      message: "Mild infestation detected on leaves.",
      timestamp: "2025-01-13 4:00 PM",
    },
    {
      id: "3",
      type: "Environment",
      message: "Temperature recorded at 30°C.",
      timestamp: "2025-01-12 12:00 PM",
    },
  ]);

  return (
    <View className="flex-1 bg-white p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-2xl font-bold text-black">History</Text>
      </View>

      {/* Log Entries */}
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-lg p-4 mb-4 shadow-sm">
            <Text className="text-sm text-gray-500">{item.timestamp}</Text>
            <Text className="text-lg font-semibold text-black mt-2">
              {item.type}
            </Text>
            <Text className="text-base text-gray-700 mt-1">{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;
