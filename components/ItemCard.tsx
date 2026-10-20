import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppContext } from '@/app/store/context';

type ItemCardProps = {
  description: string;
  imagelink: string;
  username?: string;
  savecount?: number;
  category?: string;
  [key: string]: unknown;
};

export default function ItemCard({
  description,
  imagelink,
  username,
  savecount,
  category,
  ...product
}: ItemCardProps) {
  const router = useRouter();
  const { colors } = useAppContext();

  const openProduct = () => {
    router.push({
      pathname: '/productDetail',
      params: {
        data: JSON.stringify({
          ...product,
          description,
          imagelink,
          username,
          savecount,
          category,
        }),
      },
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Open ${description}`}
      activeOpacity={0.88}
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      onPress={openProduct}>
      <View style={[styles.imageWrap, { backgroundColor: colors.surfaceAlt }]}>
        <Image source={imagelink} style={styles.image} contentFit="cover" transition={180} />
        {category ? (
          <View style={[styles.categoryBadge, { backgroundColor: colors.surface }]}>
            <Text style={[styles.categoryText, { color: colors.text }]}>{category}</Text>
          </View>
        ) : null}
        <View style={styles.sparkle}>
          <Text style={styles.sparkleText}>✦</Text>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{description.trim()}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.creator, { color: colors.muted }]} numberOfLines={1}>{username || 'A lovely idea'}</Text>
          <View style={styles.likes}>
            <Entypo name="heart" size={12} color="#EE7372" />
            <Text style={[styles.likesText, { color: colors.muted }]}>{savecount ?? 0}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48.5%',
    marginBottom: 13,
    borderRadius: 21,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0E9E5',
    shadowColor: '#7861A7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  imageWrap: {
    height: 174,
    overflow: 'hidden',
    backgroundColor: '#FCEAD5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 9,
    left: 9,
    maxWidth: '75%',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  categoryText: {
    color: '#655A72',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  sparkle: {
    position: 'absolute',
    bottom: 9,
    right: 9,
    width: 27,
    height: 27,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD96F',
  },
  sparkleText: {
    color: '#94661D',
    fontSize: 15,
  },
  details: {
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 11,
  },
  title: {
    minHeight: 34,
    color: '#352D45',
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  metaRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  creator: {
    flex: 1,
    color: '#92899C',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likesText: {
    color: '#655A72',
    fontSize: 10,
    fontWeight: '700',
  },
});
