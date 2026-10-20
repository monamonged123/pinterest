import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from './store/context';

type Product = {
  description: string;
  imagelink: string;
  logo?: string;
  username?: string;
  category?: string;
  savecount?: number;
};

function parseProduct(data: string | string[] | undefined): Product | null {
  if (typeof data !== 'string') return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null) return null;

  const value = parsed as Record<string, unknown>;
  if (typeof value.description !== 'string' || typeof value.imagelink !== 'string') {
    return null;
  }
  return {
    description: value.description,
    imagelink: value.imagelink,
    logo: typeof value.logo === 'string' ? value.logo : undefined,
    username: typeof value.username === 'string' ? value.username : undefined,
    category: typeof value.category === 'string' ? value.category : undefined,
    savecount: typeof value.savecount === 'number' ? value.savecount : undefined,
  };
}

export default function ProductDetailScreen() {
  const router = useRouter();
  const { data } = useLocalSearchParams<{ data?: string | string[] }>();
  const product = parseProduct(data);
  const { favorites, setfavorites, colors } = useAppContext();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const isWide = useWindowDimensions().width >= 760;

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  if (!product) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.errorState}>
          <Text style={[styles.errorTitle, { color: colors.text }]}>Idea not found</Text>
          <TouchableOpacity style={styles.saveButton} onPress={goBack}>
            <Text style={styles.saveButtonText}>Back to ideas</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.some((item) => item.productdescription === product.description);
  const title = product.description.trim();

  const toggleFavorite = () => {
    if (isFavorite) {
      setfavorites((previous) =>
        previous.filter((item) => item.productdescription !== product.description),
      );
      return;
    }
    setfavorites((previous) => [
      ...previous,
      {
        productdescription: product.description,
        image: product.imagelink,
        logo: product.logo ?? '',
      },
    ]);
  };

  const onShare = async () => {
    try {
      await Share.share({ message: title });
    } catch (error) {
      Alert.alert(
        'Could not share',
        error instanceof Error ? error.message : 'Please try again.',
      );
    }
  };

  const addComment = () => {
    const note = comment.trim();
    if (!note) return;
    setComments((previous) => [...previous, note]);
    setComment('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.page, isWide && styles.widePage]}>
          <View style={styles.topBar}>
            <TouchableOpacity
              accessibilityLabel="Go back"
              style={[styles.roundButton, { backgroundColor: colors.surface }]}
              onPress={goBack}>
              <Entypo name="chevron-left" size={22} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.brand, { color: colors.text }]}>little joys <Text style={styles.brandHeart}>✳</Text></Text>
            <TouchableOpacity
              accessibilityLabel="Share idea"
              style={[styles.roundButton, { backgroundColor: colors.surface }]}
              onPress={onShare}>
              <Entypo name="share" size={18} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={[styles.content, isWide && styles.wideContent]}>
            <View
              style={[
                styles.imageWrap,
                { backgroundColor: colors.surfaceAlt },
                isWide && styles.wideImageWrap,
              ]}>
              <Image
                source={product.imagelink}
                style={styles.heroImage}
                contentFit="cover"
                transition={250}
              />
              <View style={styles.imageSparkle}>
                <Text style={styles.sparkleText}>✦</Text>
              </View>
              <TouchableOpacity
                accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                style={styles.heartButton}
                onPress={toggleFavorite}>
                <Entypo
                  name={isFavorite ? 'heart' : 'heart-outlined'}
                  size={22}
                  color={isFavorite ? COLORS.coral : colors.text}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.details,
                { backgroundColor: colors.surface, borderColor: colors.border },
                isWide && styles.wideDetails,
              ]}>
              <View style={styles.categoryPill}>
                <Text style={styles.categoryText}>{product.category || 'INSPIRATION'}</Text>
                <Text style={styles.categoryFlower}>✿</Text>
              </View>

              <Text style={[styles.productTitle, { color: colors.text }]}>{title}</Text>

              <View style={styles.creatorRow}>
                {product.logo ? (
                  <Image source={product.logo} style={styles.creatorAvatar} contentFit="cover" />
                ) : (
                  <View style={[styles.creatorAvatar, styles.avatarPlaceholder, { backgroundColor: colors.surfaceAlt }]}>
                    <Entypo name="user" size={18} color={colors.purple} />
                  </View>
                )}
                <Text style={[styles.creatorName, { color: colors.muted }]}>{product.username || 'Creative community'}</Text>
                <View style={styles.saveCount}>
                  <Entypo name="heart" size={13} color={colors.coral} />
                  <Text style={[styles.saveCountText, { color: colors.text }]}>{product.savecount ?? 0}</Text>
                </View>
              </View>

              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.saveButton, isFavorite && styles.savedButton]}
                onPress={toggleFavorite}>
                <Entypo
                  name={isFavorite ? 'check' : 'plus'}
                  size={19}
                  color={COLORS.white}
                />
                <Text style={styles.saveButtonText}>
                  {isFavorite ? 'Saved!' : 'Save this idea'}
                </Text>
              </TouchableOpacity>

              <View
                style={[
                  styles.noteBox,
                  { backgroundColor: colors.background, borderColor: colors.border },
                ]}>
                <TextInput
                  style={[styles.commentInput, { color: colors.text }]}
                  placeholder="Leave a little note..."
                  placeholderTextColor={colors.muted}
                  value={comment}
                  onChangeText={setComment}
                  onSubmitEditing={addComment}
                  returnKeyType="send"
                />
                <TouchableOpacity
                  accessibilityLabel="Send note"
                  style={[styles.sendButton, !comment.trim() && styles.sendButtonDisabled]}
                  onPress={addComment}
                  disabled={!comment.trim()}>
                  <Entypo name="arrow-up" size={18} color={COLORS.white} />
                </TouchableOpacity>
              </View>

              {comments.map((note, index) => (
                <Text key={`${index}-${note}`} style={[styles.commentText, { color: colors.text }]}>{note}</Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  background: '#F7F1FF',
  ink: '#352D45',
  muted: '#90889A',
  coral: '#F36F73',
  coralDark: '#DE5F69',
  purple: '#8C76D8',
  yellow: '#FFD966',
  green: '#57B89A',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },
  page: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  widePage: {
    maxWidth: 1120,
    paddingHorizontal: 32,
  },
  topBar: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  brand: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  brandHeart: {
    color: COLORS.coral,
    fontSize: 20,
  },
  content: {
    gap: 22,
  },
  wideContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 42,
    paddingVertical: 20,
  },
  imageWrap: {
    height: 340,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFE5B3',
    shadowColor: '#8464B5',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 5,
  },
  wideImageWrap: {
    flex: 1.1,
    height: 540,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageSparkle: {
    position: 'absolute',
    left: 16,
    top: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
  },
  sparkleText: {
    color: '#98671E',
    fontSize: 23,
  },
  heartButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    padding: 20,
    borderRadius: 26,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#EEE5FF',
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 2,
  },
  wideDetails: {
    flex: 0.9,
    padding: 30,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#E8F8EF',
  },
  categoryText: {
    color: '#41866D',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  categoryFlower: {
    color: COLORS.green,
    fontSize: 14,
  },
  productTitle: {
    marginTop: 13,
    color: COLORS.ink,
    fontSize: 29,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  creatorRow: {
    marginTop: 14,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  creatorAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#EEE8FF',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  creatorName: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  saveCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#FFF0EE',
    borderRadius: 14,
  },
  saveCountText: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  saveButton: {
    height: 51,
    borderRadius: 17,
    backgroundColor: COLORS.coral,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.coralDark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },
  savedButton: {
    backgroundColor: COLORS.green,
    shadowColor: COLORS.green,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
  },
  noteBox: {
    marginTop: 14,
    minHeight: 47,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 7,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: '#EEE5FF',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  commentInput: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 9,
    color: COLORS.ink,
    fontSize: 13,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  commentText: {
    marginTop: 8,
    color: COLORS.ink,
    fontSize: 13,
    textAlign: 'left',
  },
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 18,
  },
  errorTitle: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: '800',
  },
});
