import localFont from 'next/font/local';

export const openSans = localFont({
  src: '../fonts/OpenSans.ttf',
  variable: '--font-open-sans',
  display: 'swap',
  weight: '300 800',
});

export const sourceSerif = localFont({
  src: '../fonts/SourceSerif4.ttf',
  variable: '--font-source-serif',
  display: 'swap',
  weight: '200 900',
});

export const ibmPlexMono = localFont({
  src: [
    {
      path: '../fonts/IBMPlexMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/IBMPlexMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/IBMPlexMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});
