import '../app/globals.css'; // Adjust the path if necessary
import type { AppProps } from 'next/app'; // Import the type for AppProps

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
