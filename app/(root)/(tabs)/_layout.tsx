import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { Tabs, useRouter } from "expo-router";
// Assuming you're using Clerk for authentication
import { useClerk } from "@clerk/clerk-expo";

const SideNavItem = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.navItem}>
    <Text style={styles.navText}>{label}</Text>
  </TouchableOpacity>
);

export default function Layout() {
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const router = useRouter(); // Use the router to navigate programmatically
  const { signOut } = useClerk(); // Using Clerk's signOut function

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            // Sign out using Clerk (or your auth provider)
            await signOut(); // For Clerk, this will log the user out
            setSideNavVisible(false);
            router.push("/(auth)/sign-in"); // Redirect to the login screen
          } catch (error) {
            Alert.alert("Error", "There was an error logging out.");
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Menu Button (Top Right) */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setSideNavVisible(true)}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* Modal for Side Navigation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sideNavVisible}
        onRequestClose={() => setSideNavVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.sideNav}>
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setSideNavVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {/* Side Navigation Items */}
            <Text style={styles.navHeader}>Menu</Text>
            <SideNavItem
              label="Home"
              onPress={() => {
                setSideNavVisible(false);
                router.push("/(root)/(tabs)/home"); // Navigate to Home
              }}
            />
            <SideNavItem
              label="Dashboard"
              onPress={() => {
                setSideNavVisible(false);
                router.push("/(root)/(tabs)/dashboard"); // Navigate to Dashboard
              }}
            />
            <SideNavItem
              label="History"
              onPress={() => {
                setSideNavVisible(false);
                router.push("/(root)/(tabs)/history"); // Navigate to History
              }}
            />
            <SideNavItem
              label="Logout"
              onPress={handleLogout} // Logout action
            />
          </View>
        </View>
      </Modal>

      {/* Tabs Navigation */}
      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.hiddenTabBarStyle, // Hide the bottom tab bar
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 50,
    elevation: 10,
    zIndex: 10,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hiddenTabBarStyle: {
    display: "none",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sideNav: {
    width: "70%",
    backgroundColor: "#FFF",
    height: "100%",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  navHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  navItem: {
    marginBottom: 15,
  },
  navText: {
    fontSize: 16,
  },
});
