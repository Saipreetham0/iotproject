"use client";
import Head from "next/head";
import Script from "next/script";
const Header = () => {
  function addWesiteJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TheSkypedia",
        "alternateName": "Jntuh Theskypedia",
        "url": "https://jntuhresults.theskypedia.com/",
        "logo": "https://theskypedia.com/wp-content/uploads/2022/06/cropped-theskypedia.com-logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/theskypedia/",
          "https://www.instagram.com/theskypedia",
          "https://theskypedia.com/",
          "https://www.youtube.com/@theskypedia"
        ]
      }`,
    };
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="The Skypedia" />
        {/* <!-- Primary Meta Tags --> */}
        <title>JNTUH RESULTS</title>
        <meta name="title" content="JNTUH RESULTS" />
        <meta
          name="description"
          content="You can find the Results Of Your Entire UG & PG Courses (JNTUH)."
        />
        <meta name="keywords" content="jntuh Results, results jntuh" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addWesiteJsonLd()}
          key="product-jsonld"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          property="og:url"
          content="https://jntuhresults.theskypedia.com/"
        />
        <meta property="og:type" content="RESULTS"></meta>
        <meta
          name="image"
          property="og:image"
          content="https://jntuhresults.theskypedia.com/homepage.jpg"
        ></meta>
        <meta name="author" content="Mohd Moiz Uddin"></meta>

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://jntuhresults.theskypedia.com/"
        />
        <meta property="og:title" content="JNTUH RESULTS" />
        <meta
          property="og:description"
          content="You can find the Results Of Your Entire UG & PG Courses (JNTUH)."
        />
        <meta
          property="og:image"
          content="https://jntuhresults.theskypedia.com/homepage.jpg"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://jntuhresults.theskypedia.com/"
        />
        <meta property="twitter:title" content="JNTUH RESULTS" />
        <meta
          property="twitter:description"
          content="You can find the Results Of Your Entire UG & PG Courses (JNTUH)."
        />
        <meta
          property="twitter:image"
          content="https://jntuhresults.theskypedia.com/homepage.jpg"
        />

        <script
          data-ad-client="ca-pub-4870864326886980"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    // console.log("dark Mode");
                }
                else
                {
                  // console.log("light mode");
                }
                addEventListener('popstate', (event) => { });
                onpopstate = (event) => {
                  console.log("pressed");
                  window.location.reload();
                 };
                  `,
          }}
        ></script>
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-N1FJ0X03GL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N1FJ0X03GL');
        `}
      </Script>
    </>
  );
};
export default Header;
