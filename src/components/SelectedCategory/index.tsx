import React from 'react';
import { ScrollView } from 'react-native';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

import { styles } from './styles';

type SelectedCategoryProps = {
  selectedCategory: string;
  setSelectedCategory: (_categoryId: string) => void;
}

export function SelectedCategory({ selectedCategory, setSelectedCategory }: SelectedCategoryProps) {
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
          />
        ))
      }
    </ScrollView>
  );
}
