import About from "./components/landing-page/About.tsx"
import Hero from "./components/landing-page/Hero.tsx"
import NavigationBar from "./components/layout/NavigationBar.tsx"
import Layout from "./components/layout/Layout.tsx"
import Benefits from "./components/landing-page/Benefits.tsx"
import Footer from "./components/layout/Footer.tsx"
import GuestLayout from "@/components/layout/Guest/GuestLayout";

function App() {

  return (
    <>
      <GuestLayout
        title="Thinkflow"
        description="Wuwa">

          <Hero/>
          <About/>
          <Benefits/>
      </GuestLayout>
      <Footer/>
    </>
  )
}

export default App
