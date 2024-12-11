import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPageData } from "@/redux/slices/publicDataSlice";
import { initializeLocale } from "@/redux/slices/languageSlice";
import DefaultLayout from "@/components/layout/DefaultLayout";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPageData());
    dispatch(initializeLocale());
  }, [dispatch]);

  return <DefaultLayout>{children}</DefaultLayout>;
};

const WrappedApp = ({ children }) => (
  <Provider store={store}>
    <AppWrapper>{children}</AppWrapper>
  </Provider>
);

export default WrappedApp;
