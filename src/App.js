import React, {
  Suspense,
  lazy,
  useState,
} from 'react'
import { Loading } from './Loading'

const Posts = lazy(() => import(/* webpackChunkName: "Posts" */ './Posts'))
const Users = lazy(() => import(/* webpackChunkName: "Users" */ './Users'))

function App() {
  const [isOpen, setOpen] = useState(false)

  console.log("render app, state:", { isOpen })

  return (
    <div className="container">
      <h1>Suspense for Data Fetching</h1>

      <Suspense fallback={<Loading />}>
        <Posts />
      </Suspense>

      <button onClick={() => setOpen(true)}>Show users</button>

      {isOpen && (
        <Suspense fallback={<Loading />}>
          <Users />
        </Suspense>
      )}
    </div>
  )
}

export default App
