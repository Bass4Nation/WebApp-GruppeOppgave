import '../styles/globals.scss'
import Footer from '@/components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
