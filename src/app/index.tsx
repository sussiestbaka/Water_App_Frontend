import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router'; // 1. Importar
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Allah() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Hero Section */}
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Water App
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Análisis de Colorimetría
          </ThemedText>
        </ThemedView>

        {/* Info Card Container */}
        <ThemedView style={styles.infoCard}>
          <ThemedText style={styles.description}>
            Esta aplicación analiza la calidad del agua utilizando la tecnología PC-DART para ofrecerte resultados precisos.
          </ThemedText>
        </ThemedView>

        {/* Main Action Button */}
        <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => router.push('/analisis')} 
        >
          <ThemedText style={styles.buttonText}>
            Iniciar Analisis
          </ThemedText>
        </TouchableOpacity>        
        
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four || 24, // Added fallback padding just in case
    alignItems: 'center',
    justifyContent: 'center', // Centers the whole layout vertically
    paddingBottom: BottomTabInset + Spacing.one,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.five || 40,
    gap: Spacing.one || 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 32, // Pops more as a headline
    marginTop: 16,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    opacity: 0.6, // Gives it a softer look than the main title
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(150, 150, 150, 0.1)', // Creates a subtle glass/card effect
    padding: 24,
    borderRadius: 20,
    width: '100%',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24, // Improves paragraph readability
  },
  primaryButton: {
    backgroundColor: '#0ea5e9', // A vibrant "water" blue
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});