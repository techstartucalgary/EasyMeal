import { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSearchRecipe } from 'services/searchRecipe';

const DummyPage = () => {
  const { searchRecipeResponse, isLoading } = useSearchRecipe({
    query: 'chocolate',
  });

  return (
    <SafeAreaView>
      <View>
        {isLoading ? 'Im am loading' : JSON.stringify(searchRecipeResponse)}
      </View>
    </SafeAreaView>
  );
};

export default DummyPage;
