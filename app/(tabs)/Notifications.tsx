import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../store/context';

const Notifications = () => {
  const { colors } = useAppContext();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: '800' },
})