import appConfig from '../config.json'
import Head from "next/head";

function GlobalStyle() {
  return (
    <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 

        /* width */
        ::-webkit-scrollbar {
            width: 6px;
        }
    
        /* Track */
        ::-webkit-scrollbar-track {
            background: ${appConfig.theme.colors.neutrals["500"]};
            border-radius: 4px;
        }
     
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${appConfig.theme.colors.primary['900']}; 
            border-radius: 2px;
        }
      `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {  
  //wrapper - em volta de tudo
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Concord</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Concord" key="title" />
        <meta property="og:description" content="Pare de discordar e Concord." />
        <meta property="og:url" content="https://concord-zeta.vercel.app/" />
        <meta itemprop="image" content="/discord.png"></meta>
        <link rel="shortcut icon" href="/discord.png" />
        <meta name="theme-color" content={appConfig.theme.colors.primary['800']} />
      </Head>
      <Component {...pageProps} />
    </>

  )
}