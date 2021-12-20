import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { AppProvider } from "../context/app.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
