import About from "./components/landing-page/About.tsx"
import Hero from "./components/landing-page/Hero.tsx"
import Layout from "./components/layout/Layout.tsx"

function App() {

  return (
    <>
      <Layout
        title="Hehe"
        description="Wuwa">

          <Hero/>
          <About/>

      </Layout>
    </>
  )
}

export default App
