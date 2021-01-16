import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx>
        {`
          :global(body) {
            font-size: 18px;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
