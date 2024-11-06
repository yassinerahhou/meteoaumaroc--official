import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Histats.com Script */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                var _Hasync = _Hasync || [];
                _Hasync.push(['Histats.start', '1,4907731,4,511,95,18,00000000']);
                _Hasync.push(['Histats.fasi', '1']);
                _Hasync.push(['Histats.track_hits', '']);
                (function() {
                  var hs = document.createElement('script');
                  hs.type = 'text/javascript';
                  hs.async = true;
                  hs.src = '//s10.histats.com/js15_as.js';
                  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
                })();
              `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
