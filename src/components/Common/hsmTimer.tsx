import React from "react";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const NumberCard = ({ number = 0 }) => {
  function numberText() {
    if (number && Math.sign(number) >= 0) {
      if (number.toString().length === 1) {
        return ("0" + number).slice(-2);
      } else {
        return number;
      }
    } else {
      return "00";
    }
  }
  const renderNumber = () => <Text style={styles.number}>{numberText()}</Text>;

  return <View style={styles.containerCard}>{renderNumber()}</View>;
}

function HMSTimer({ startDate, onTimerFinished }: { startDate: Date, onTimerFinished: () => void }) {
  const targetTime = new Date(startDate).getTime();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const timeBetween = useMemo(() => targetTime - currentTime, [
    currentTime,
    targetTime
  ]);

  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeBetween % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeBetween % (1000 * 60)) / 1000);

  const totalHours = days * 24 + hours;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeBetween <= 0) {
        clearInterval(interval);
        onTimerFinished();
      } else {
        setCurrentTime(Date.now());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeBetween, onTimerFinished]);

  return (
    <View style={styles.container}>
      <NumberCard number={totalHours} />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={minutes} />
      <Text style={styles.colorDivider}>:</Text>
      <NumberCard number={seconds} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  colorDivider: {
    fontSize: 20,
    fontWeight: "bold"
  },
  containerCard: {
    backgroundColor: "#333333",
    margin: 4,
    borderRadius: 5,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1f1f1f",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 5
  },
  number: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold"
  }
});

export default HMSTimer;
