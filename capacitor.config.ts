import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agrotech.resilience',
  appName: 'AgriVision',
  webDir: 'public',
  backgroundColor: '#020817',
  server: {
    url: 'https://agrotech-resilience.vercel.app',
    cleartext: true
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: '#020617',
      style: 'DARK'
    }
  }
};

export default config;
