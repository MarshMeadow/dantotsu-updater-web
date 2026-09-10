import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Gate, { isVerified } from './components/Gate'
import Layout from './components/Layout'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dmca from './pages/Dmca'

function App() {
  const [verified, setVerified] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setVerified(isVerified())
    setReady(true)
  }, [])

  if (!ready) return null

  if (!verified) {
    return <Gate onVerify={() => setVerified(true)} />
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dmca" element={<Dmca />} />
          <Route path="/legal/dmca" element={<Dmca />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  )
}

export default App
