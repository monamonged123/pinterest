
import Homepage from '@/components/Homepage';
import React from 'react';
import { StyleSheet, View } from 'react-native';


const index = () => {
  return (
    <View style={styles.container}>
        < Homepage />
    </View>

  )
}

export default index

const styles = StyleSheet.create({

  container: {
    flex: 1,
backgroundColor:"white",
  }

})

 