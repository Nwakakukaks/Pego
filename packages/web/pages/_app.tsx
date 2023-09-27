import '../styles/mui-overrides.scss';
import '../styles/globals.scss';
import '../styles/appmain.scss';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
