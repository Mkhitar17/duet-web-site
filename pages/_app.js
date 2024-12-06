import DefaultLayout from "@/components/layout/DefaultLayout";
import { store } from '@/redux/store';
import { Provider } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        // Call the API handler
        const response = await axios.get("/api/handlers/visitor/pageData");
        setPageData(response.data); // Update state with fetched data
        console.log("Fetched Page Data:", response.data);
      } catch (error) {
        console.error("Error fetching page data:", error);
      }
    };

    fetchPageData(); // Fetch data on mount
  }, []);
  return (
    <Provider store={store}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  )
}
