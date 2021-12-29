import type { AppProps } from "next/app";
import { AppProvider } from "../context/app.context";
import "../styles/globals.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
