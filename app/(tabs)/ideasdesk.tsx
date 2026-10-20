import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../store/context';

const IdeasDeskScreen = () => {
    const { name, image } = useLocalSearchParams<{ name?: string | string[]; image?: string | string[] }>()
    const { colors } = useAppContext();
    const imageUri = Array.isArray(image) ? image[0] : image;
    const displayName = Array.isArray(name) ? name[0] : name;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {imageUri ? <Image style={styles.img} source={{ uri: imageUri }} /> : null}
          <Text style={[styles.mountain, { color: colors.text }]}>{displayName}</Text>
        </View>
    )
}

export default IdeasDeskScreen

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
},
img:{
    width:300,
    height:170,
    borderRadius:20,
margin:15,

},
mountain:{
textAlign:"center",
fontSize:25

}

})