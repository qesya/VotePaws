import React, { memo } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type PressableButtonProps = {
  onPress: () => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  testID?: string;
  disabled?: boolean;
  pressableStyle?: StyleProp<ViewStyle>;
};

const PressableButton: React.FC<PressableButtonProps> = ({
  onPress,
  children,
  style,
  testID,
  disabled,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value, { damping: 10, stiffness: 200 }) },
    ],
  }));

  const handlePressIn = (e: GestureResponderEvent) => {
    scale.value = 0.95;
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    scale.value = 1;
    onPressOut?.(e);
  };

  const buttonStyles: ViewStyle = {
    flexDirection: "column",
    alignContent: "center",
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={testID}
      disabled={disabled}
      style={props.pressableStyle}
      {...props}
    >
      <Animated.View
        style={[buttonStyles, style, animatedStyle]}
        testID="pressable-btn-inner-view-test"
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default memo(PressableButton);
