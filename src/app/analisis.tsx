import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CameraScanner } from '@/components/camera-scanner'; // Importar el componente de cámara
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import * as DocumentPicker from 'expo-document-picker';

export default function Habibi() {
  const [loading, setLoading] = useState(false);

  // --- Lógica Unificada de Envío ---
  const handleAnalysis = async (uri: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      if (Platform.OS === 'web') {
        // Conversión a Web
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append('file', blob, 'upload.jpg');
      } else {
        // Formato para Nativo (iOS/Android)
        formData.append('file', {
          uri,
          name: 'scan.jpg',
          type: 'image/jpeg',
        } as any);
      }

      // API FLASK ENDPOOINT
      const response = await fetch('http://TU_IP_LOCAL:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Análisis exitoso:', data);
      Alert.alert('Éxito', 'Imagen analizada correctamente');
    } catch (error) {
      console.error('Error en el análisis:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // --- Lógica para Web (Document Picker) ---
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      handleAnalysis(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.header}>
          <ThemedText type="subtitle">Escaneo PC-DART</ThemedText>
          <ThemedText style={styles.helperText}>
            {loading ? "Procesando..." : (Platform.OS === 'web' ? "Análisis vía archivo" : "Alinea la muestra en el recuadro")}
          </ThemedText>
        </View>

        {/* Contenedor de la Cámara / Vista Previa */}
        
        {Platform.OS !== 'web' && (
        <View style={styles.cameraPlaceholder}>
          {loading ? (
            <ActivityIndicator size="large" color="#0ea5e9" />
          ) : (
            <CameraScanner onCapture={handleAnalysis} />
          )}
          {!loading && <View style={styles.scanGuide} pointerEvents="none" />}
        </View>
        )}

        {/* Botón de Acción Principal */}
        <TouchableOpacity 
          style={styles.captureButton} 
          activeOpacity={0.8}
          onPress={ pickDocument }
          disabled={loading}
        >
          <View style={[styles.outerRing, loading && { opacity: 0.3 }]}>
            <View style={styles.innerCircle} >
              <ThemedText  style={styles.buttontext}>
              {loading ? '...' : 'Importa una foto'}
              </ThemedText>
            </View>
          </View>
                
        </TouchableOpacity>

        {Platform.OS === 'web' && (
          <ThemedText style={{ marginTop: 10, opacity: 0.5 }}>
            Web Mode: Haz click en el circulo para analizar
          </ThemedText>
        )}
        
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.one
  },
  header: { alignItems: 'center', marginVertical: Spacing.four },
  helperText: { fontSize: 14, opacity: 0.6, marginTop: 4 },
  buttontext: {textAlign: 'center',color: '#caf5faff' },
  cameraPlaceholder: {
    flex: 1,
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scanGuide: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#0ea5e9',
    borderRadius: 20,
    borderStyle: 'dashed',
  },
  captureButton: { marginBottom: 20 },
  outerRing: {
    width: 280,
    height: 60,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  innerCircle: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#0ea5e9',
  },
});