import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agrotech.resilience',
  appName: 'Agrotech Resilience',
  webDir: 'public',
  server: {
    url: 'https://agrotech-resilience.vercel.app',
    cleartext: true
  }
};

export default config;
