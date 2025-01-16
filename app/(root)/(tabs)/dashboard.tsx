import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Svg, {
  Line,
  Circle,
  G,
  Text as SvgText,
  Polyline,
} from "react-native-svg";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width - 40; // Adjust for padding
const chartPadding = 20; // Padding for the chart to prevent overflow

const Dashboard = () => {
  const [overviewCards, setOverviewCards] = useState([
    {
      title: "Growth Stage",
      value: "Vegetative",
      description: "15 days to next stage",
      backgroundColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Pest Status",
      value: "No pests detected",
      description: "Last checked: Today",
      backgroundColor: "bg-red-100",
      textColor: "text-red-700",
    },
  ]);

  const [environmentMetrics, setEnvironmentMetrics] = useState([
    { label: "Light Exposure", value: "80%" },
    { label: "Temperature", value: "28°C" },
    { label: "Humidity", value: "65%" },
  ]);

  const [graphs, setGraphs] = useState({
    growthProgress: [20, 25, 35, 50, 70],
    pestTrends: [0, 2, 1, 0, 3],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setOverviewCards([
        {
          title: "Growth Stage",
          value: ["Seedling", "Vegetative", "Flowering", "Harvest"][
            Math.floor(Math.random() * 4)
          ],
          description: `${Math.floor(Math.random() * 30)} days to next stage`,
          backgroundColor: "bg-green-100",
          textColor: "text-green-700",
        },
        {
          title: "Pest Status",
          value: [
            "No pests detected",
            "Mild infestation",
            "Severe infestation",
          ][Math.floor(Math.random() * 3)],
          description: "Last checked: Today",
          backgroundColor: "bg-red-100",
          textColor: "text-red-700",
        },
      ]);

      setEnvironmentMetrics([
        {
          label: "Light Exposure",
          value: `${Math.floor(Math.random() * 100)}%`,
        },
        { label: "Temperature", value: `${Math.floor(Math.random() * 35)}°C` },
        { label: "Humidity", value: `${Math.floor(Math.random() * 100)}%` },
      ]);

      setGraphs({
        growthProgress: Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * 100),
        ),
        pestTrends: Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * 5),
        ),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderLineChart = (data: number[], color: string) => {
    const maxData = Math.max(...data);
    const height = 200;
    const width = screenWidth - 2 * chartPadding; // Adjust for chart padding
    const stepX = width / (data.length - 1);
    const stepY = maxData === 0 ? 0 : (height - chartPadding) / maxData;

    const points = data
      .map(
        (value, index) =>
          `${chartPadding + index * stepX},${
            height - chartPadding - value * stepY
          }`,
      )
      .join(" ");

    return (
      <Svg height={height} width={screenWidth}>
        <G>
          <Line
            x1={chartPadding}
            y1={height - chartPadding}
            x2={screenWidth - chartPadding}
            y2={height - chartPadding}
            stroke="#ddd"
          />
          <Line
            x1={chartPadding}
            y1={chartPadding}
            x2={chartPadding}
            y2={height - chartPadding}
            stroke="#ddd"
          />
        </G>
        <Polyline points={points} fill="none" stroke={color} strokeWidth="2" />
        {data.map((value, index) => (
          <Circle
            key={index}
            cx={chartPadding + index * stepX}
            cy={height - chartPadding - value * stepY}
            r="4"
            fill={color}
          />
        ))}
        {data.map((value, index) => (
          <SvgText
            key={index}
            x={chartPadding + index * stepX}
            y={height - chartPadding - value * stepY - 10}
            fontSize="12"
            fill={color}
            textAnchor="middle"
          >
            {value}
          </SvgText>
        ))}
      </Svg>
    );
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-2xl font-bold text-black">Dashboard</Text>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
      </View>

      {/* Overview Cards */}
      <View className="flex-row justify-between mb-5">
        {overviewCards.map((card, index) => (
          <View
            key={index}
            className={`${card.backgroundColor} rounded-lg flex-1 mx-2 p-4 shadow-sm`}
          >
            <Text className={`text-lg font-bold ${card.textColor}`}>
              {card.title}
            </Text>
            <Text className="text-black text-base mt-2">{card.value}</Text>
            <Text className="text-gray-500 mt-1">{card.description}</Text>
          </View>
        ))}
      </View>

      {/* Environmental Metrics */}
      <View className="bg-blue-100 rounded-lg p-4 mb-5 shadow-sm">
        <Text className="text-lg font-bold text-blue-700">
          Environmental Metrics
        </Text>
        {environmentMetrics.map((metric, index) => (
          <Text key={index} className="text-black mt-1">
            {metric.label}: {metric.value}
          </Text>
        ))}
      </View>

      {/* Growth Progress Graph */}
      <View className="bg-gray-100 rounded-lg p-4 mb-5 shadow-sm">
        <Text className="text-lg font-bold text-black">Growth Progress</Text>
        {renderLineChart(graphs.growthProgress, "#22c55e")}
      </View>

      {/* Pest Detection Trends Graph */}
      <View className="bg-gray-100 rounded-lg p-4 mb-5 shadow-sm">
        <Text className="text-lg font-bold text-black">
          Pest Detection Trends
        </Text>
        {renderLineChart(graphs.pestTrends, "#ef4444")}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
