import IconButton from "@/src/components/atoms/IconButton";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BUTTON_ICON_TYPES } from "../../atoms/Icon/Icon";

export type ButtonIconGroupItem = {
  id: string;
  icon: keyof typeof BUTTON_ICON_TYPES;
  activeIcon?: keyof typeof BUTTON_ICON_TYPES;
  isActive?: boolean;
  activeIconColor?: string;
  iconColor?: string;
};

export type ButtonIconGroupProps = {
  data: ButtonIconGroupItem[];
  direction?: "horizontal" | "vertical";
  spacing?: number;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  onItemPress?: (item: ButtonIconGroupItem) => void;
};

const ButtonIconGroup: React.FC<ButtonIconGroupProps> = ({
  data,
  direction = "horizontal",
  spacing = 8,
  size = 24,
  containerStyle,
  onItemPress,
}) => {
  const isHorizontal = direction === "horizontal";

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isHorizontal ? "row" : "column",
          gap: spacing,
        },
        containerStyle,
      ]}
    >
      {data.map((item) => {
        const iconToShow =
          item.isActive && item.activeIcon ? item.activeIcon : item.icon;

        const fillColor = item.isActive ? item.activeIconColor : item.iconColor;

        return (
          <IconButton
            key={item.id}
            testID={`icon-button-${item.id}`}
            icon={iconToShow}
            onPress={() => onItemPress?.(item)}
            size={size}
            customIconColor={fillColor}
            customIconColorPressed={
              item.isActive ? item.activeIconColor : item.iconColor
            }
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ButtonIconGroup);
