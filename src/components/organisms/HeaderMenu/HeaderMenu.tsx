import { IconButton } from "@/src/components";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type HeaderMenuProps = {
  onPressBack?: () => void;
  imageSource?: ImageSourcePropType;
  onFavPress?: () => void;
  badgeCount?: number;
  style?: StyleProp<ViewStyle>;
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  onPressBack,
  imageSource,
  onFavPress,
  badgeCount,
  style,
}) => {
  const source: ImageSourcePropType =
    imageSource ?? require("../../../assets/images/votepaws.png");

  return (
    <View style={[styles.container, style]}>
      <View style={styles.wrapper}>
        {onPressBack ? (
          <IconButton icon="chevron-left-icon" onPress={onPressBack} />
        ) : null}
        <Image source={source} style={styles.logo} resizeMode="contain" />
      </View>

      {onFavPress ? (
        <IconButton
          icon="heart-icon"
          badgeCount={badgeCount}
          onPress={onFavPress}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? 48 : 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
  },
  logo: {
    width: 74.89,
    height: 25.69,
  },
});

export default React.memo(HeaderMenu);
