import Header from "../Header/Header";

const Footer = () => {};

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
