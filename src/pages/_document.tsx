import { Html, Head, Main, NextScript } from "next/document";
import Logo from "../../public/assest/Logo.png";


export default function Document() {
  return (
    <Html lang="en">
      <Head ><meta property="og:image" content='/Logo.png' /> </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
