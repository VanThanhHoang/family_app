import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Image,
  Text,
} from "react-native";
import PropTypes from "prop-types";

function calculateDegreeFromLabels(degree, labels) {
  var perLevelDegree = degree / labels.length;
  return perLevelDegree;
}

function calculateLabelFromValue(value, labels, minValue, maxValue) {
  var currentValue = (value - minValue) / (maxValue - minValue);
  var currentIndex = Math.round((labels.length - 1) * currentValue);
  var label = labels[currentIndex];
  return label;
}

function limitValue(value, minValue, maxValue, allowedDecimals) {
  var currentValue = 0;

  if (!isNaN(value)) {
    if (!isNaN(allowedDecimals) && allowedDecimals > 0) {
      currentValue = parseFloat(value).toFixed(
        allowedDecimals < 4 ? parseInt(allowedDecimals) : 4
      );
    } else {
      currentValue = parseInt(value);
    }
  }

  return Math.min(Math.max(currentValue, minValue), maxValue);
}

function validateSize(current, original) {
  var currentSize = original;

  if (!isNaN(current)) {
    currentSize = parseInt(current);
  }

  return currentSize;
}

const { width } = Dimensions.get("window");
const style = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
    alignSelf: "center",
  },
  // Circular Container
  circleWrapper: {
    overflow: "hidden",
  },
  outerCircle: {
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    borderColor: "#ffffff",
    backgroundColor: "#e6e6e6",
  },
  halfCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  imageWrapper: {
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  image: {
    resizeMode: "stretch",
    height: width - 20,
    width: width - 20,
  },
  innerCircle: {
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: width * 0.6,
    height: (width / 2) * 0.6,
    borderTopLeftRadius: width / 2 - 10,
    borderTopRightRadius: width / 2 - 10,
  },
  labelWrapper: {
    marginVertical: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
  },
  labelNote: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const Speedometer = ({
  value,
  defaultValue = 0,
  size,
  minValue = 0,
  maxValue = 500,
  easeDuration = 500,
  allowedDecimals = 0,
  labels = [
    { name: "Good", labelColor: "#06e503", activeBarColor: "#06e503" },
    { name: "Medium", labelColor: "#fefc00", activeBarColor: "#fefc00" },
    {
      name: "Least",
      labelColor: "#ff7e00",
      activeBarColor: "#ff7e00",
    },
    {
      name: "Bad",
      labelColor: "#fc2401",
      activeBarColor: "#fc2401",
    },
    { name: "Very bad", labelColor: "#9c154d", activeBarColor: "#9c154d" },
    { name: "Very bad", labelColor: "#9c154d", activeBarColor: "#9c154d" },
    { name: "Dangerous", labelColor: "#810e1e", activeBarColor: "#810e1e" },
    { name: "Dangerous", labelColor: "#810e1e", activeBarColor: "#810e1e" },
    { name: "Dangerous", labelColor: "#810e1e", activeBarColor: "#810e1e" },

  ],
  needleImage = require("../assets/speedometer-needle.png"),
  wrapperStyle = {},
  outerCircleStyle = {},
  halfCircleStyle = {},
  imageWrapperStyle = {},
  imageStyle = {},
  innerCircleStyle = {},
  labelWrapperStyle = {},
  labelStyle = {},
  labelNoteStyle = {},
  useNativeDriver = true,
}) => {
  const speedometerValue = useRef(new Animated.Value(defaultValue)).current;
  const degree = 180;
  const perLevelDegree = calculateDegreeFromLabels(degree, labels);
  const label = calculateLabelFromValue(
    limitValue(value, minValue, maxValue, allowedDecimals),
    labels,
    minValue,
    maxValue
  );
  const currentSize = validateSize(size, width - 20);

  useEffect(() => {
    Animated.timing(speedometerValue, {
      toValue: limitValue(value, minValue, maxValue, allowedDecimals),
      duration: easeDuration,
      easing: Easing.linear,
      useNativeDriver: useNativeDriver,
    }).start();
  }, [value]);

  const rotate = speedometerValue.interpolate({
    inputRange: [minValue, maxValue],
    outputRange: ["-90deg", "90deg"],
  });

  return (
    <View
      style={[
        style.wrapper,
        { width: currentSize, height: currentSize / 2 },
        wrapperStyle,
      ]}
    >
      <View
        style={[
          style.outerCircle,
          {
            width: currentSize,
            height: currentSize / 2,
            borderTopLeftRadius: currentSize / 2,
            borderTopRightRadius: currentSize / 2,
          },
          outerCircleStyle,
        ]}
      >
        {labels.map((level, index) => {
          const circleDegree = 90 + index * perLevelDegree;
          return (
            <View
              key={index}
              style={[
                style.halfCircle,
                {
                  backgroundColor: level.activeBarColor,
                  width: currentSize / 2,
                  height: currentSize,
                  borderRadius: currentSize / 2,
                  transform: [
                    { translateX: currentSize / 4 },
                    { rotate: circleDegree + "deg" },
                    { translateX: -currentSize / 4 },
                  ],
                },
                halfCircleStyle,
              ]}
            />
          );
        })}
        <Animated.View
          style={[
            style.imageWrapper,
            { top: -(currentSize / 15), transform: [{ rotate: rotate }] },
            imageWrapperStyle,
          ]}
        >
          <Image
            style={[
              style.image,
              { width: currentSize, height: currentSize },
              imageStyle,
            ]}
            source={needleImage}
          />
        </Animated.View>
        <View
          style={[
            style.innerCircle,
            {
              width: currentSize * 0.6,
              height: (currentSize / 2) * 0.6,
              borderTopLeftRadius: currentSize / 2,
              borderTopRightRadius: currentSize / 2,
            },
            innerCircleStyle,
          ]}
        />
      </View>
      <View style={[style.labelWrapper, labelWrapperStyle]}>
        <Text style={[style.label, labelStyle]}>{`${limitValue(
          value,
          minValue,
          maxValue,
          allowedDecimals
        )} AQI`}</Text>
        <Text
          style={[
            style.labelNote,
            { color: label.labelColor },
            labelNoteStyle,
            { fontWeight: "bold", fontSize: 24 },
          ]}
        >
          {label.name}
        </Text>
      </View>
    </View>
  );
};

Speedometer.propTypes = {
  value: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  size: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  easeDuration: PropTypes.number,
  allowedDecimals: PropTypes.number,
  labels: PropTypes.array,
  needleImage: PropTypes.any,
  wrapperStyle: PropTypes.object,
  outerCircleStyle: PropTypes.object,
  halfCircleStyle: PropTypes.object,
  imageWrapperStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  innerCircleStyle: PropTypes.object,
  labelWrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelNoteStyle: PropTypes.object,
  useNativeDriver: PropTypes.bool,
};

export default Speedometer;
