import { useEffect, useState, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Disclaimer, { isDisclaimerAccepted } from './components/Disclaimer'
import Gate, { isVerified } from './components/Gate'
import Loading from './components/Loading'
import Layout from './components/Layout'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Dmca = lazy(() => import('./pages/Dmca'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const [ready, setReady] = useState(false)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    setDisclaimerAccepted(isDisclaimerAccepted())
    setVerified(isVerified())
    setReady(true)
  }, [])

  if (!ready) return <Loading />

  if (!disclaimerAccepted) {
    return <Disclaimer onAccept={() => setDisclaimerAccepted(true)} />
  }

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
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Footer />
    </Suspense>
  )
}

export default App
