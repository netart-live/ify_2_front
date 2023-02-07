import "@/styles/globals.css";
import { montaga, spectral } from "../components/fonts";

export default function App({ Component, pageProps }) {
  return (
    <main className={`${montaga.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
