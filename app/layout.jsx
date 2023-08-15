import Navbar from "@components/Navbar";
import Provider from "@components/Providers";
import CartContextProvider from "@context/context";
import "@styles/globals.css";

export const metadata = {
  title: "Lazashopee",
  description: "We got everything you need!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div />
          </div>
          <CartContextProvider>
            <main className="app">
              <Navbar />
              {children}
            </main>
          </CartContextProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
