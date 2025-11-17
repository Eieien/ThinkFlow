import About from "./components/landing-page/About.tsx"
import Hero from "./components/landing-page/Hero.tsx"
import NavigationBar from "./components/layout/NavigationBar.tsx"
import Layout from "./components/layout/Layout.tsx"

function App() {

  return (
    <>
      <Layout
        title="Thinkflow"
        description="Wuwa">

          <Hero/>
          <About/>

      </Layout>
    </>
  )
}

export default App
