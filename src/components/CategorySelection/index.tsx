import React from 'react';
import { ScrollView } from 'react-native';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

import { styles } from './styles';

type CategorySelectionProps = {
  selectedCategory: string;
  setSelectedCategory: (_categoryId: string) => void;
  hasCheckBox?: boolean;
}

export function CategorySelection({
  selectedCategory,
  setSelectedCategory,
  hasCheckBox = false,
}: CategorySelectionProps) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {
        categories.map((category) => (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === selectedCategory}
            onPress={() => setSelectedCategory(category.id)}
            hasCheckBox={hasCheckBox}
          />
        ))
      }
    </ScrollView>
  );
}

CategorySelection.defaultProps = {
  hasCheckBox: false,
};
