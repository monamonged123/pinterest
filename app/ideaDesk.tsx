import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '@/components/ItemCard';
import { products } from '@/components/data';
import { useAppContext } from './store/context';

type Idea = {
  description: string;
  imagelink: string;
  category: string;
  username?: string;
  savecount?: number;
  [key: string]: unknown;
};

type Board = {
  name: string;
  logo?: string;
};

function parseBoard(data: string | string[] | undefined): Board | null {
  if (typeof data !== 'string') return null;

  try {
    const parsed: unknown = JSON.parse(data);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const value = parsed as Record<string, unknown>;
    if (typeof value.name !== 'string') return null;
    return {
      name: value.name,
      logo: typeof value.logo === 'string' ? value.logo : undefined,
    };
  } catch {
    return null;
  }
}

const categoryNames: Record<string, string> = {
  cake: 'Sweet treats',
  sport: 'Move & feel good',
  shoes: 'Fresh steps',
  nails: 'Nail art',
  furneture: 'Cozy spaces',
  furniture: 'Cozy spaces',
  clothes: 'Wear your joy',
  bags: 'Everyday favorites',
};

const categoryColors: Record<string, { accent: string; soft: string; flower: string }> = {
  cake: { accent: '#E87960', soft: '#FFF0DA', flower: '✿' },
  sport: { accent: '#3B9B83', soft: '#E4F7E9', flower: '✦' },
  shoes: { accent: '#7C6BD6', soft: '#EEE9FF', flower: '✧' },
  nails: { accent: '#E36B9A', soft: '#FFE8F1', flower: '♡' },
  furneture: { accent: '#C28B4D', soft: '#FFF0D8', flower: '✿' },
  furniture: { accent: '#C28B4D', soft: '#FFF0D8', flower: '✿' },
  clothes: { accent: '#588CCB', soft: '#E7F2FF', flower: '✦' },
  bags: { accent: '#D47755', soft: '#FFF0E6', flower: '♡' },
};

export default function IdeaDeskScreen() {
  const router = useRouter();
  const { data } = useLocalSearchParams<{ data?: string | string[] }>();
  const board = parseBoard(data);
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [sortPopular, setSortPopular] = useState(false);
  const { colors, isDark } = useAppContext();
  const wide = width >= 760;
  const pageWidth = Math.min(width - (wide ? 72 : 36), 1120);

  const boardName = board?.name ?? 'Ideas';
  const normalizedCategory = boardName.trim().toLowerCase();
  const theme = categoryColors[normalizedCategory] ?? {
    accent: '#E87960',
    soft: '#FFF0DA',
    flower: '✿',
  };
  const displayName = categoryNames[normalizedCategory] ?? boardName;
  const boardIdeas = useMemo(
    () =>
      (products as Idea[]).filter(
        (idea) => idea.category?.trim().toLowerCase() === normalizedCategory,
      ),
    [normalizedCategory],
  );
  const visibleIdeas = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = term
      ? boardIdeas.filter(
          (idea) =>
            idea.description?.toLowerCase().includes(term) ||
            idea.username?.toLowerCase().includes(term),
        )
      : boardIdeas;
    return sortPopular
      ? [...filtered].sort((first, second) => (second.savecount ?? 0) - (first.savecount ?? 0))
      : filtered;
  }, [boardIdeas, query, sortPopular]);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  if (!board) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.emptyPage}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Let’s find some ideas</Text>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const coverImage = boardIdeas[0]?.imagelink;
  const formattedCount = String(boardIdeas.length).padStart(2, '0');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.page, { width: pageWidth }]}>
          <View style={styles.navBar}>
            <TouchableOpacity
              accessibilityLabel="Go back"
              style={[styles.iconButton, { backgroundColor: colors.surface }]}
              onPress={goBack}>
              <Entypo name="chevron-left" size={22} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.wordmark, { color: colors.text }]}>the happy place <Text style={styles.wordmarkStar}>✳</Text></Text>
            <View style={[styles.navTag, { backgroundColor: colors.surface }]}>
              <View style={styles.onlineDot} />
              <Text style={styles.navTagText}>YOUR IDEAS</Text>
            </View>
          </View>

          <View style={[styles.hero, { backgroundColor: theme.soft }, wide && styles.wideHero]}>
            {coverImage ? (
              <Image source={coverImage} style={styles.heroImage} contentFit="cover" />
            ) : null}
            <View
              style={[
                styles.heroTint,
                { backgroundColor: isDark ? 'rgba(23,21,29,0.76)' : 'rgba(255,255,255,0.62)' },
              ]}
            />
            <View style={[styles.heroCopy, wide && styles.wideHeroCopy]}>
              <View
                style={[
                  styles.heroEyebrow,
                  {
                    backgroundColor: isDark
                      ? 'rgba(36,33,44,0.9)'
                      : 'rgba(255,255,255,0.86)',
                  },
                ]}>
                <Text style={[styles.heroEyebrowFlower, { color: theme.accent }]}>
                  {theme.flower}
                </Text>
                <Text style={[styles.heroEyebrowText, { color: colors.muted }]}>A LITTLE INSPIRATION</Text>
              </View>
              <Text style={[styles.heroTitle, { color: colors.text }]}>{displayName}</Text>
              <Text style={[styles.heroSubtitle, { color: colors.muted }]}>Good ideas live here.</Text>
              <View style={styles.heroCount}>
                <Text style={[styles.heroCountNumber, { color: colors.text }]}>{formattedCount}</Text>
                <Text style={[styles.heroCountLabel, { color: colors.muted }]}>lovely ideas</Text>
              </View>
            </View>
            <View style={[styles.doodle, styles.doodleOne, { backgroundColor: theme.accent }]}>
              <Text style={styles.doodleText}>{theme.flower}</Text>
            </View>
            <View style={[styles.doodle, styles.doodleTwo]}>
              <Text style={styles.doodleText}>✦</Text>
            </View>
            <View style={[styles.doodle, styles.doodleThree, { backgroundColor: theme.accent }]}>
              <Text style={styles.doodleText}>♡</Text>
            </View>
          </View>

          <View style={styles.collectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>A COLLECTION FOR YOU</Text>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Pick your happy</Text>
            </View>
            <View style={[styles.collectionFlower, { backgroundColor: theme.soft }]}>
              <Text style={[styles.collectionFlowerText, { color: theme.accent }]}>
                {theme.flower}
              </Text>
            </View>
          </View>

          <View style={styles.toolsRow}>
            <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Entypo name="magnifying-glass" size={18} color={colors.muted} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Find a little something..."
                placeholderTextColor={colors.muted}
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
              />
              {query.length > 0 ? (
                <TouchableOpacity
                  accessibilityLabel="Clear search"
                  onPress={() => setQuery('')}>
                  <Entypo name="circle-with-cross" size={16} color={colors.muted} />
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={sortPopular ? 'Show all ideas' : 'Show most loved ideas'}
              style={[
                styles.sortButton,
                !sortPopular && { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
                sortPopular && { backgroundColor: theme.accent, borderColor: theme.accent },
              ]}
              onPress={() => setSortPopular((value) => !value)}>
              <Entypo name="heart" size={15} color={sortPopular ? COLORS.white : theme.accent} />
              <Text
                style={[
                  styles.sortButtonText,
                  !sortPopular && { color: colors.text },
                  sortPopular && styles.sortButtonTextActive,
                ]}>
                {sortPopular ? 'Most loved' : 'Popular'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsCount, { color: colors.text }]}>
              {visibleIdeas.length} {visibleIdeas.length === 1 ? 'idea' : 'ideas'}
            </Text>
            <Text style={[styles.resultsNote, { color: colors.muted }]}>Made to make you smile</Text>
          </View>

          {visibleIdeas.length > 0 ? (
            <View style={styles.grid}>
              {visibleIdeas.map((idea, index) => (
                <ItemCard
                  key={`${idea.category}-${idea.description}-${index}`}
                  {...idea}
                />
              ))}
            </View>
          ) : (
            <View style={[styles.noResults, { backgroundColor: colors.surface }]}>
              <Text style={styles.noResultsFlower}>{query ? '🔎' : '🌼'}</Text>
              <Text style={[styles.noResultsTitle, { color: colors.text }]}>
                {query ? 'No little matches yet' : 'Your collection is taking a nap'}
              </Text>
              <Text style={[styles.noResultsText, { color: colors.muted }]}>
                {query ? 'Try another word and see what blooms.' : 'Come back soon for fresh ideas.'}
              </Text>
              {query ? (
                <TouchableOpacity
                  style={[styles.clearButton, { backgroundColor: colors.accentSoft }]}
                  onPress={() => setQuery('')}>
                  <Text style={[styles.clearButtonText, { color: colors.purple }]}>Clear search</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}

          <Text style={[styles.footer, { color: colors.muted }]}>A little joy, saved for later ✿</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  background: '#FFF9F2',
  surface: '#FFFFFF',
  ink: '#352D45',
  muted: '#92899C',
  line: '#F1EAE4',
  coral: '#F07170',
  purple: '#8C76D8',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 34,
  },
  page: {
    alignSelf: 'center',
    paddingBottom: 10,
  },
  navBar: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2,
  },
  wordmark: {
    color: COLORS.ink,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  wordmarkStar: {
    color: COLORS.coral,
    fontSize: 20,
  },
  navTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#64C79E',
  },
  navTagText: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  hero: {
    height: 274,
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },
  wideHero: {
    height: 315,
    paddingHorizontal: 42,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.28,
  },
  heroTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.62)',
  },
  heroCopy: {
    alignItems: 'flex-start',
    maxWidth: 330,
  },
  wideHeroCopy: {
    maxWidth: 450,
  },
  heroEyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderRadius: 15,
  },
  heroEyebrowFlower: {
    fontSize: 14,
  },
  heroEyebrowText: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroTitle: {
    marginTop: 14,
    color: COLORS.ink,
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '900',
    letterSpacing: -1.1,
    textTransform: 'capitalize',
  },
  heroSubtitle: {
    marginTop: 5,
    color: '#665D72',
    fontSize: 15,
    fontWeight: '600',
  },
  heroCount: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 7,
  },
  heroCountNumber: {
    color: COLORS.ink,
    fontSize: 22,
    fontWeight: '900',
  },
  heroCountLabel: {
    color: '#665D72',
    fontSize: 12,
    fontWeight: '600',
  },
  doodle: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD66B',
    transform: [{ rotate: '-12deg' }],
  },
  doodleOne: {
    top: 25,
    right: 30,
  },
  doodleTwo: {
    width: 38,
    height: 38,
    top: 105,
    right: 112,
    borderRadius: 19,
    backgroundColor: '#C8B9FF',
    transform: [{ rotate: '12deg' }],
  },
  doodleThree: {
    width: 42,
    height: 42,
    bottom: 24,
    right: 48,
    borderRadius: 21,
    backgroundColor: '#79CBA5',
    transform: [{ rotate: '8deg' }],
  },
  doodleText: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: '800',
  },
  collectionHeader: {
    marginTop: 29,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionEyebrow: {
    color: COLORS.coral,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  sectionTitle: {
    marginTop: 4,
    color: COLORS.ink,
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  collectionFlower: {
    width: 45,
    height: 45,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '8deg' }],
  },
  collectionFlowerText: {
    fontSize: 25,
  },
  toolsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBox: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    padding: 0,
    color: COLORS.ink,
    fontSize: 13,
  },
  sortButton: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F5D6D2',
    backgroundColor: '#FFF0EE',
  },
  sortButtonText: {
    color: '#BA5A59',
    fontSize: 12,
    fontWeight: '800',
  },
  sortButtonTextActive: {
    color: COLORS.white,
  },
  resultsHeader: {
    marginTop: 21,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsCount: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  resultsNote: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  noResults: {
    marginTop: 14,
    minHeight: 205,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  noResultsFlower: {
    fontSize: 35,
  },
  noResultsTitle: {
    marginTop: 8,
    color: COLORS.ink,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  noResultsText: {
    marginTop: 5,
    color: COLORS.muted,
    fontSize: 12,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 13,
    backgroundColor: '#EEE9FF',
  },
  clearButtonText: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: '800',
  },
  footer: {
    paddingTop: 18,
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyTitle: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  backButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: COLORS.coral,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: '800',
  },
});
