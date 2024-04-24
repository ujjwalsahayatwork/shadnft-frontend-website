import { Html, Head, Main, NextScript } from "next/document";
import Logo from "../../public/assest/Logo.png";
// import solo from "../charting_library/charting_library_copy.js"


export default function Document() {
  return (
    <Html lang="en">
      <Head ><meta property="og:image" content='/Logo.png' />
        {/* <script
          type="text/javascript"
          src="https://illuminals.io/chart/charting_library.js"
        ></script> */}
        


      </Head>
      <body>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
