// @ts-expect-error: next-pwa missing types
import withPWAInit from 'next-pwa';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(withPWA(nextConfig));
