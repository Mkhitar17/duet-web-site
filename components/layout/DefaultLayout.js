// components/layout/DefaultLayout.js
import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
