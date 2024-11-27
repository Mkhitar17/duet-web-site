import DefaultLayout from "@/components/layout/DefaultLayout";
import { store } from '@/redux/store';
import { Provider } from "react-redux";
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  )
}
