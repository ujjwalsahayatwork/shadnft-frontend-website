import { Html, Head, Main, NextScript } from "next/document";
import Logo from "../../public/assest/Logo.png";
// import solo from "../charting_library/charting_library_copy.js"


export default function Document() {
  return (
    <Html lang="en">
      <Head > <link rel="icon" href="/assest/Logo.png" />
        <meta property="og:image" content="/assest/Logo.png" />

      </Head>
      <body>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
