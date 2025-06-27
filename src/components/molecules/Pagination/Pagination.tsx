import { Button, IconButton } from "@/src/components";
import { useColors } from "@/src/hooks";
import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  style?: StyleProp<ViewStyle>;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  style,
}) => {
  const { gray700, white } = useColors();

  const pages = useMemo(() => {
    const pages: (number | "...")[] = [];

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage <= maxVisiblePages) {
      for (let i = 2; i <= maxVisiblePages; i++) {
        pages.push(i);
      }
      pages.push("...");
    } else if (currentPage >= totalPages - maxVisiblePages + 1) {
      pages.push("...");
      for (let i = totalPages - maxVisiblePages + 1; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push("...");
      pages.push(currentPage);
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  const renderPage = (page: number | "...", index: number) => {
    if (page === "...") {
      return (
        <IconButton
          key={`ellipsis-${index}`}
          icon="ellipsis-icon"
          customIconColor={gray700}
          onPress={() => {}}
          innerContainerStyle={styles.navButtonEllipsis}
        />
      );
    }

    const isActive = page === currentPage;

    return (
      <Button
        key={`page-${page}`}
        title={String(page)}
        type="outline"
        buttonSize="sm"
        onPress={() => onPageChange(page)}
        style={[styles.pageButton, isActive && { backgroundColor: gray700 }]}
        textStyle={[isActive && { color: white }]}
      />
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Button
        title="Prev"
        icon="chevron-left-icon"
        iconPosition="left"
        type="outline"
        buttonSize="sm"
        onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
        isDisabled={currentPage === 1}
        style={styles.navButtonLeft}
        customGapIcon={2}
      />

      {pages.map(renderPage)}

      <Button
        title="Next"
        icon="chevron-right-icon"
        iconPosition="left"
        type="outline"
        buttonSize="sm"
        onPress={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        isDisabled={currentPage === totalPages}
        style={styles.navBtnRight}
        customGapIcon={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  navButtonLeft: {
    paddingLeft: 0,
    paddingRight: 9,
  },
  navBtnRight: {
    paddingRight: 8,
    paddingLeft: 0,
  },
  navButtonEllipsis: {
    paddingHorizontal: 0,
  },
  pageButton: {
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
});

export default React.memo(Pagination);
