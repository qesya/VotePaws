import { Icon } from "@/src/components";
import { useColors } from "@/src/hooks";
import { BUTTON_SIZES, ButtonSize, ButtonVariants } from "@/src/theme";
import React, { memo, useState } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BUTTON_ICON_TYPES } from "../Icon/Icon";
import Typography from "../Typography";
import PressableButton from "./PressableButton";

type ButtonProps = {
  type: ButtonVariants;
  title: string;
  buttonSize?: ButtonSize;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: keyof typeof BUTTON_ICON_TYPES;
  iconPosition?: "left" | "right";
  iconWidth?: number;
  iconHeight?: number;
  customIconColor?: string;
  customIconColorPressed?: string;
  textStyle?: StyleProp<TextStyle>;
  testId?: string;
  customGapIcon?: number;
};

type ButtonThemeProps = {
  defaultColor: string;
  hoverColor: string;
  disabledColor: string;
  textColorDefault: string;
  textColorDisabled: string;
  hoverTextColor?: string;
  borderColor?: string;
};

const Button: React.FC<Readonly<ButtonProps>> = ({
  type,
  title,
  onPress,
  buttonSize = "md",
  style,
  isLoading = false,
  isDisabled = false,
  icon,
  iconPosition = "left",
  iconWidth,
  iconHeight,
  customIconColor,
  customIconColorPressed,
  textStyle,
  testId,
  customGapIcon,
}) => {
  const {
    primaryColor400,
    primaryColor500,
    gray50,
    gray100,
    gray200,
    gray300,
    gray700,
    error500,
    error600,
    error200,
    error100,
    white,
  } = useColors();

  const scale = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);
  const gapIconSize = customGapIcon ?? 8;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value, { damping: 10, stiffness: 200 }) },
    ],
  }));

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = 0.95;
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = 1;
  };

  const buttonTheme: Record<ButtonVariants, ButtonThemeProps> = {
    primary: {
      defaultColor: primaryColor400,
      hoverColor: primaryColor500,
      disabledColor: gray300,
      textColorDefault: white,
      textColorDisabled: white,
    },
    secondary: {
      defaultColor: gray100,
      hoverColor: gray200,
      disabledColor: gray200,
      textColorDefault: gray700,
      textColorDisabled: white,
    },
    tertiary: {
      defaultColor: "transparent",
      hoverColor: "transparent",
      disabledColor: "transparent",
      textColorDefault: primaryColor400,
      textColorDisabled: gray300,
      hoverTextColor: primaryColor500,
    },
    "destructive-primary": {
      defaultColor: error500,
      hoverColor: error600,
      disabledColor: error200,
      textColorDefault: white,
      textColorDisabled: white,
    },
    "destructive-secondary": {
      defaultColor: error100,
      hoverColor: error200,
      disabledColor: error200,
      textColorDefault: error500,
      textColorDisabled: white,
    },
    outline: {
      defaultColor: white,
      hoverColor: gray50,
      disabledColor: gray200,
      textColorDefault: gray700,
      textColorDisabled: gray300,
      borderColor: gray200,
    },
  };

  const fontSizeMap = {
    sm: "textSM",
    md: "textSM",
    lg: "textBase",
    xl: "textBase",
  } as const;

  const buttonHeight = BUTTON_SIZES[buttonSize];
  const fontSize = fontSizeMap[buttonSize];
  const fontWeight = "semiBold";

  const theme = buttonTheme[type];

  let backgroundColor = theme.defaultColor;

  if (isDisabled) {
    backgroundColor = theme.disabledColor;
  } else if (isPressed) {
    backgroundColor = theme.hoverColor;
  }

  let resolvedTextColor = theme.textColorDefault;

  if (isDisabled) {
    resolvedTextColor = theme.textColorDisabled ?? theme.textColorDefault;
  } else if (isPressed && "hoverTextColor" in theme) {
    resolvedTextColor = (theme as any).hoverTextColor;
  }

  const shouldApplyShadow = [
    "primary",
    "secondary",
    "destructive-primary",
    "destructive-secondary",
  ].includes(type);

  const buttonStyles: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor,
    paddingHorizontal: 20,
    borderRadius: 8,
    height: buttonHeight,
    ...(type === "outline" && {
      borderWidth: 1,
      borderColor: theme.borderColor,
    }),
    ...(shouldApplyShadow && {
      shadowColor: "rgba(18, 23, 33, 1)",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 1,
    }),
  };

  return (
    <PressableButton
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[buttonStyles, style, animatedStyle]}
      testID={testId}
    >
      {isLoading ? (
        <ActivityIndicator
          testID="activity-indicator"
          size="small"
          color={theme.textColorDefault}
        />
      ) : (
        <View style={styles.btnOuter}>
          {icon && iconPosition === "left" && (
            <Icon
              icon={icon}
              height={iconHeight}
              width={iconWidth}
              fill={
                isPressed
                  ? (customIconColorPressed ?? resolvedTextColor)
                  : (customIconColor ?? resolvedTextColor)
              }
              style={{ marginRight: gapIconSize }}
            />
          )}
          <Typography
            style={[
              {
                color: resolvedTextColor,
                textDecorationLine: type === "tertiary" ? "underline" : "none",
              },
              textStyle,
            ]}
            weight={fontWeight}
            size={fontSize}
          >
            {title}
          </Typography>
          {icon && iconPosition === "right" && (
            <Icon
              icon={icon}
              height={iconHeight}
              width={iconWidth}
              fill={
                isPressed
                  ? (customIconColorPressed ?? resolvedTextColor)
                  : (customIconColor ?? resolvedTextColor)
              }
              style={{ marginLeft: gapIconSize }}
            />
          )}
        </View>
      )}
    </PressableButton>
  );
};

const styles = StyleSheet.create({
  btnOuter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(Button);
