import { useEffect, useState, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Gate, { isVerified } from './components/Gate'
import Loading from './components/Loading'
import Layout from './components/Layout'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Dmca = lazy(() => import('./pages/Dmca'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const [verified, setVerified] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setVerified(isVerified())
    setReady(true)
  }, [])

  if (!ready) return <Loading />

  if (!verified) {
    return <Gate onVerify={() => setVerified(true)} />
  }

  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dmca" element={<Dmca />} />
          <Route path="/legal/dmca" element={<Dmca />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Footer />
    </Suspense>
  )
}

export default App
