import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext, type FavoriteItem } from '@/app/store/context';

const FavoriteComp = (props: FavoriteItem) => {
    const { setfavorites } = useAppContext();
    const removeFromFavorites = () => {
        setfavorites((previous) =>
            previous.filter((item) => item.productdescription !== props.productdescription),
        );
    };

    return (
        <View style={styles.card}>
            <Image style={styles.img} source={props.image} contentFit="cover" />
            <View style={styles.box}>
                <View style={styles.board}>
                    {props.logo ? <Image style={styles.fav} source={props.logo} contentFit="cover" /> : null}
                    <Text style={styles.form}>{props.productdescription}</Text>
                    <TouchableOpacity accessibilityLabel="Remove from favorites" onPress={removeFromFavorites}>
                        <Entypo name="heart" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default FavoriteComp;

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 150,

        // alignSelf:"center",
        borderRadius: 20,
        margin: 55,
        flexDirection: "row"
    },
    img: {
        width: 200,
        height: 200,
        //   alignSelf:"center",
        borderRadius: 20,


    },
    fav: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    box: {
        flexDirection: "row",
        marginLeft: 7,
        marginTop: 60
    },
    form: {
        fontSize: 17,
        marginTop: 10,
        marginLeft: 5,
        marginBottom:15
    },
    board:{
        flexDirection:"column",
    }
})