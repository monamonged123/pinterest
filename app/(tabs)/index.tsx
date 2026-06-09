
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
    <Text style={styles.chat}>yours</Text>
    <FontAwesome name="magic" size={24} color="white" />
    </View>
    
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  
container:{
  flex:1,
  backgroundColor:"black",
  justifyContent:"space-between",

},
chat:{
  color:"white",
  padding:5,
    marginLeft:5,
},
box:{
  alignItems:"center",
  flexDirection: "row",
  justifyContent:"space-between",
  marginRight:10,
  marginTop:2,
}


})


