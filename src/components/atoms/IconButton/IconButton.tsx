import { BadgeNumber, Icon, PressableButton } from "@/src/components";
import { useColors } from "@/src/hooks";
import React, { useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BUTTON_ICON_TYPES } from "../Icon/Icon";

type IconButtonProps = {
  onPress: () => void;
  icon: keyof typeof BUTTON_ICON_TYPES;
  size?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  customIconColor?: string;
  customIconColorPressed?: string;
  badgeCount?: number;
  backgroundColor?: string;
  innerContainerStyle?: StyleProp<ViewStyle>;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size,
  style,
  testID,
  customIconColor,
  customIconColorPressed,
  badgeCount,
  backgroundColor,
  innerContainerStyle,
}) => {
  const { gray400, gray700, transparent } = useColors();
  const [isHovered, setIsHovered] = useState(false);

  const hasBadge = badgeCount != null && badgeCount > 0;
  const iconSize = size ?? 24;
  const isCustomSized = size != null;

  const containerStyle: ViewStyle = isCustomSized
    ? { padding: 10, borderRadius: 10 }
    : { width: 44, height: 44, borderRadius: 10 };

  return (
    <PressableButton
      onPress={onPress}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      style={[
        containerStyle,
        { backgroundColor: backgroundColor ?? transparent },
        styles.centered,
        style,
      ]}
      testID={testID}
    >
      <View style={[styles.iconWrapper, innerContainerStyle]}>
        <Icon
          icon={icon}
          width={iconSize}
          height={iconSize}
          fill={
            isHovered
              ? (customIconColorPressed ?? gray400)
              : (customIconColor ?? gray700)
          }
        />
        {hasBadge && (
          <View style={styles.badgeWrapper}>
            <BadgeNumber number={badgeCount} />
          </View>
        )}
      </View>
    </PressableButton>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeWrapper: {
    position: "absolute",
    top: -2,
    right: -2,
  },
});

export default React.memo(IconButton);
