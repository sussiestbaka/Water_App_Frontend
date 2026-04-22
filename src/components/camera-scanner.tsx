import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  onCapture: (uri: string) => void;
}

export function CameraScanner({ onCapture }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />; // Cargando permisos

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Ionicons name="camera" size={24} color="white" />
          {/* Aquí podrías poner un texto pidiendo permisos */}
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) onCapture(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing="back">
        {/* Guía visual (Dashed box) */}
        <View style={styles.overlay}>
          <View style={styles.scanGuide} />
        </View>
      </CameraView>
      
      {/* Botón de disparo interno al componente para mejor encapsulación */}
      <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', borderRadius: 24, overflow: 'hidden' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  scanGuide: { width: 250, height: 250, borderWidth: 2, borderColor: '#0ea5e9', borderStyle: 'dashed', borderRadius: 20 },
  captureBtn: { position: 'absolute', bottom: 20, alignSelf: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 4, borderColor: 'white', padding: 4 },
  innerCircle: { flex: 1, backgroundColor: 'white', borderRadius: 30 },
  permissionButton: { padding: 20, backgroundColor: '#0ea5e9', borderRadius: 10 }
});