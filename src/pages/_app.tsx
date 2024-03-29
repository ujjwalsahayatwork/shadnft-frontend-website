import Sites from "@/components/Site";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "@/components/userContext/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet"
      />
      <UserProvider>
      <Sites>
        <Component {...pageProps} />
      </Sites>
      </UserProvider>
    </>
  );
}
