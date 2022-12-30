import "../styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClientProvider, QueryClient } from "react-query";
import AppBar from "../components/AppBar";
import AuthContextProvider from "../context/AuthContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppBar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
