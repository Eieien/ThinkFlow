import About from "./components/landing-page/About.tsx"
import Hero from "./components/landing-page/Hero.tsx"
import NavigationBar from "./components/layout/NavigationBar.tsx"
import Layout from "./components/layout/Layout.tsx"
import Benefits from "./components/landing-page/Benefits.tsx"
import Footer from "./components/layout/Footer.tsx"

function App() {

  return (
    <>
      <Layout
        title="Thinkflow"
        description="Wuwa">
          <NavigationBar/>

          <Hero/>
          <About/>
          <Benefits/>
      </Layout>
      <Footer/>
    </>
  )
}

export default App
