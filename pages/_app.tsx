import "../styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClientProvider, QueryClient } from "react-query";
import AppBar from "../components/AppBar";
import AuthContextProvider from "../context/AuthContext";
import styled from "styled-components";
import CartContextProvider from "../context/CartContext";

const StyledMain = styled.main`
  padding: 100px;
`;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <AppBar />
          <StyledMain>
            <Component {...pageProps} />
          </StyledMain>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
