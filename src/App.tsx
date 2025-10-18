import Layout from "./components/Layout.tsx"
import NotesCard from "./components/NotesCard.tsx"

function App() {

  return (
    <>
      <Layout
        title="Hehe"
        description="Wuwa">

          <div className='grid grid-col-3 gap-4'>
            <NotesCard 
                title="Prog 2 Notes"
                dateCreated="Aug 2 2025"
                creator="Ivan Ruelan"
                description="Prog 2 Notes Suffering raahh"
              />
            <NotesCard 
              title="Prog 2 Notes"
              dateCreated="Aug 2 2025"
              creator="Ivan Ruelan"
              description="Prog 2 Notes Suffering raahh"
            />
            
          </div>

      </Layout>
    </>
  )
}

export default App
