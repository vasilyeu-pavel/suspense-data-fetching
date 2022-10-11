import React, {
  Suspense,
  lazy,
  useState,
} from 'react'
import { Loading } from './Loading'

const Posts = lazy(() => import(/* webpackChunkName: "Posts" */ './Posts'))
const Users = lazy(() => import(/* webpackChunkName: "Users" */ './Users'))

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return null;
        }

        return this.props.children;
    }
}

function App() {
  const [isOpen, setOpen] = useState(false)

  console.log("render app, state:", { isOpen })

  return (
    <div className="container">
      <h1>Suspense for Data Fetching</h1>

        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Posts />
          </Suspense>
        </ErrorBoundary>

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
