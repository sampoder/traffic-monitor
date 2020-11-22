import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    body: "'Perfect DOS VGA 437', system-ui, sans-serif",
    heading: "'Perfect DOS VGA 437', Georgia, serif",
    mono: "Menlo, monospace",
  },
})

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>
}

export default MyApp
