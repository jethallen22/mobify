import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface RateComponentProps {
  rating: number;
}

const RateComponent = ({ rating }: RateComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.star}>⭐️</Text>
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
  },
  star: {
    color: "#FFD700",
    fontSize: 14,
  },
});

export default RateComponent;
