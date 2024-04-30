import Sites from "@/components/Site";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/components/userContext/UserContext";
import Logo from "../../public/assest/Logo.png";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet"
      />
     {/* <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"></meta> */}
      <UserProvider>
        <Sites>
          <Component {...pageProps} />
        </Sites>
      </UserProvider>
    </>
  );
}
