import '@/styles/globals.css'
import AppWrapper from "@/components/wrappers/appWrapper";


export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
