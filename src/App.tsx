import About from "./components/landing-page/About.tsx"
import Hero from "./components/landing-page/Hero.tsx"
import GuestHeader from "./components/layout/GuestHeader.tsx"
import Layout from "./components/layout/Layout.tsx"

function App() {

  return (
    <>
      <Layout
        title="Thinkflow"
        description="Wuwa">
          <GuestHeader/>

          <Hero/>
          <About/>

      </Layout>
    </>
  )
}

export default App
