```
import motion from 'motion/react'
export function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contac">Contact</Link>
            </nav>
            <AnimatePresence />
        </BrowserRouter>
    )
}

export const AnimatePresence = () => {
  return (
    <AnimatePresence>
        <Routes>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>}
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>}
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>}
        </Routes>
    </AnimatePresence>
  )
}

export const PageTransition = ({children}) => {
  return (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
    >
        {children}
    </motion.div>
  )
}
```
