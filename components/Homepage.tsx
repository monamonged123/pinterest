
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { catagory } from '../components/data';
import Card from './Card';
import { useAppContext } from '@/app/store/context';

const Homepage = () => {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useAppContext();

  const goToCart = () => {
    router.push('/favorite');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.topBarWrap, { backgroundColor: colors.surfaceAlt }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <FontAwesome name="pinterest" size={22} color="#fff" />
          </View>
          <Text style={[styles.chat, { color: colors.text }]}>Pinterest</Text>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            onPress={toggleTheme}
            style={[styles.themeButton, { backgroundColor: colors.surface }]}>
            <MaterialIcons
              name={isDark ? 'light-mode' : 'dark-mode'}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToCart} style={styles.favoriteButton}>
            <MaterialIcons name="favorite-border" size={23} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.heroCard, { backgroundColor: colors.surface }]}>
          <View style={styles.heroTextWrap}>
            <View style={styles.heroEyebrowRow}>
              <MaterialIcons name="auto-awesome" size={15} color="#a45687" />
              <Text style={[styles.heroEyebrow, { color: colors.purple }]}>A little inspiration</Text>
            </View>
            <Text style={[styles.heroTitle, { color: colors.text }]}>Find your happy place.</Text>
            <Text style={[styles.heroSub, { color: colors.muted }]}>Fresh ideas for the things you love.</Text>
          </View>
          <View style={styles.heroBadge}>
            <MaterialIcons name="auto-awesome" size={19} color="#9b6a19" />
            <Text style={styles.heroBadgeText}>Made for</Text>
            <Text style={styles.heroBadgeLabel}>your happy</Text>
            <Text style={styles.heroBadgeLabel}>moments</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular collections</Text>
          <View style={styles.sectionMetaWrap}>
            <MaterialIcons name="favorite" size={14} color="#f07691" />
            <Text style={[styles.sectionMeta, { color: colors.muted }]}>Made to make you smile</Text>
          </View>
        </View>

        <View style={styles.desk}>
          {catagory.map((item) => (
            <Card key={item.name} {...item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf4',
  },
  topBarWrap: {
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: '#fce1e8',
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#e74465',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e74465',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
  chat: {
    color: '#30243b',
    padding: 5,
    fontSize: 27,
    fontWeight: '800',
    flex: 1,
    marginLeft: 10,
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#fffaf6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  themeButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  heroCard: {
    marginHorizontal: 18,
    backgroundColor: '#fffdf9',
    borderRadius: 28,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#b96b83',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
  },
  heroTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  heroEyebrow: {
    fontSize: 12,
    color: '#a45687',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginLeft: 5,
  },
  heroEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#30243b',
    lineHeight: 33,
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 13,
    lineHeight: 20,
    color: '#766b7d',
  },
  heroBadge: {
    backgroundColor: '#fff0c9',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 10,
    minWidth: 82,
    alignItems: 'center',
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#795e31',
    marginTop: 3,
  },
  heroBadgeLabel: {
    fontSize: 10,
    color: '#90774c',
    lineHeight: 13,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#30243b',
  },
  sectionMetaWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sectionMeta: {
    fontSize: 12,
    color: '#8b7787',
    fontWeight: '600',
  },
  desk: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
