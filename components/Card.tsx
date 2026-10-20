import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppContext } from '@/app/store/context'

const Card = (props: any) => {
  const router = useRouter()
  const { colors } = useAppContext()

  const Goto = () => {
    const str = JSON.stringify(props)
    router.push({
      pathname: '/ideaDesk',
      params: { data: str },
    })
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={Goto}
      style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={[styles.imageWrap, { backgroundColor: colors.surfaceAlt }]}>
        <Image
          source={props.logo}
          style={props.style || styles.mona}
          transition={180}
        />
      </View>
      <Text style={[styles.cardName, { color: colors.text }]}>{props.name}</Text>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    width: '46%',
    backgroundColor: '#fffefd',
    borderRadius: 24,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#1f1a4d',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },
  imageWrap: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#f7eefa',
  },
  mona: {
    width: '100%',
    height: 160,
    borderRadius: 18,
  },
  round: {
    width: 210,
    height: 240,
    margin: 20,
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  cardName: {
    marginTop: 11,
    marginBottom: 4,
    fontSize: 17,
    fontWeight: '700',
    color: '#1f1d2c',
    textTransform: 'capitalize',
  },
})