import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      
      <Tabs screenOptions={{ tabBarActiveTintColor: '#0ea5e9' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />

        
        <Tabs.Screen
          name="analisis"
          options={{
            href: null, // <--- ESTO oculta el botón del tab bar abajo
            title: 'Análisis',
            headerShown: true, 
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}