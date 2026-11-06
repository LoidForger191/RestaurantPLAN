import Header from "./components/Header";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Signature from "./components/Signature";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Story />
        <Signature />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
