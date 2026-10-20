import FavoriteComp from '@/components/FavoriteComp';
import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from './store/context';

const FavoriteScreen = () => {
  const { favorites } = useAppContext();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.checkifempty}>
          <Text style={styles.run}>Favorite Is Empty</Text>
        </View>
      ) : (
        favorites.map((item, index) => (
          <FavoriteComp key={`${item.productdescription}-${index}`} {...item} />
        ))
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  run: {
    fontSize: 27,
    color: "#f55353",
  },
  checkifempty:{
justifyContent: "center",
alignItems:"center",

  }
})
