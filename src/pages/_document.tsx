import { Html, Head, Main, NextScript } from "next/document";
import Logo from "../../public/assest/Logo.png";
// import solo from "../charting_library/charting_library_copy.js"


export default function Document() {
  return (
    <Html lang="en">
      <Head ><meta property="og:image" content='/Logo.png' />
        <script
          type="text/javascript"
          src="http://127.0.0.1:5501/charting_library/charting_library.js"
        ></script>
        <script type="module" src="http://127.0.0.1:5501/src/main.js" ></script>


      </Head>
      <body>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
