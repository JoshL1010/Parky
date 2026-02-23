import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

type Confidence = "High" | "Medium" | "Low";

type Segment = {
  id: string;
  street: string;
  confidence: Confidence;
  distance: number;
};

const initialSegments: Segment[] = [
  { id: "1", street: "Courtenay Place", confidence: "Low", distance: 220 },
  { id: "2", street: "Tory Street", confidence: "Medium", distance: 350 },
  { id: "3", street: "Kent Terrace", confidence: "High", distance: 480 },
  { id: "4", street: "Cambridge Terrace", confidence: "Medium", distance: 610 },
];

function bumpConfidence(conf: Confidence): Confidence {
  if (conf === "Low") return "Medium";
  if (conf === "Medium") return "High";
  return "High";
}

export default function ParkyHome() {
  const [segments, setSegments] = useState(initialSegments);
  const [message, setMessage] = useState<string | null>(null);

  const top3 = useMemo(() => {
    const score = (c: Confidence) =>
      c === "High" ? 3 : c === "Medium" ? 2 : 1;

    return [...segments]
      .sort(
        (a, b) =>
          score(b.confidence) - score(a.confidence) ||
          a.distance - b.distance
      )
      .slice(0, 3);
  }, [segments]);

  function handleReport() {
    const nearest = [...segments].sort((a, b) => a.distance - b.distance)[0];

    setSegments((prev) =>
      prev.map((s) =>
        s.id === nearest.id
          ? { ...s, confidence: bumpConfidence(s.confidence) }
          : s
      )
    );

    setMessage(`Reported spot freed on ${nearest.street}`);
    setTimeout(() => setMessage(null), 2000);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Parky</Text>

        <TextInput
          placeholder="Search destination (mock)"
          placeholderTextColor="#888"
          style={styles.input}
        />

        {message && <Text style={styles.message}>{message}</Text>}

        <Text style={styles.sectionTitle}>Parking confidence</Text>

        {segments.map((s) => (
          <View key={s.id} style={styles.card}>
            <View>
              <Text style={styles.street}>{s.street}</Text>
              <Text style={styles.meta}>{s.distance}m away</Text>
            </View>
            <Text style={confidenceStyle(s.confidence)}>
              {s.confidence}
            </Text>
          </View>
        ))}

        <Pressable style={styles.button} onPress={handleReport}>
          <Text style={styles.buttonText}>I left a spot</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Top streets to try</Text>

        {top3.map((s, i) => (
          <View key={s.id} style={styles.topCard}>
            <Text style={styles.rank}>#{i + 1}</Text>
            <Text style={styles.street}>{s.street}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function confidenceStyle(conf: Confidence) {
  if (conf === "High") return styles.high;
  if (conf === "Medium") return styles.medium;
  return styles.low;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  content: {
    padding: 18,
    paddingBottom: 28,
  },
  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 14,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#111",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 16,
  },
  message: {
    color: "#4ade80",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#bdbdbd",
    marginTop: 18,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#101010",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  street: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    color: "#8a8a8a",
    fontSize: 12,
    marginTop: 2,
  },
  high: { color: "#4ade80", fontWeight: "700" },
  medium: { color: "#facc15", fontWeight: "700" },
  low: { color: "#f87171", fontWeight: "700" },
  button: {
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
  topCard: {
    backgroundColor: "#101010",
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  rank: {
    color: "#888",
    fontWeight: "600",
  },
});