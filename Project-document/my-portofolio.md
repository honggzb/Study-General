##  Portofolio React + TypeScript + Vite

- [Portofolio React + TypeScript + Vite](#portofolio-react--typescript--vite)
- [using Chakra UI](#using-chakra-ui)
  - [setup ChakraUI and Theme](#setup-chakraui-and-theme)
  - [setup fonts of Chakra](#setup-fonts-of-chakra)
  - [some tips of ChakraUI responsive](#some-tips-of-chakraui-responsive)
- [i18n](#i18n)
- [using GSAP](#using-gsap)

## using Chakra UI

- [chakra-ui](https://chakra-ui.com/getting-started)
- `npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`
- [Vite project set up](https://chakra-ui.com/getting-started/vite-guide) the `ChakraProvider` at the root of your application

```typescript
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider><App /></ChakraProvider>
  </React.StrictMode>,
)
```

### setup ChakraUI and Theme

```typescript
// styles/theme.ts
import { extendTheme } from '@chakra-ui/react'
const colors = {
    primary: {
      dark: '#FF7308',
      light: '#FFCD69',
    },
    secondary: '#0F1B61',
    black: '#000000'
  }
export const myTheme = extendTheme({ colors });
//main.tsx
import { myTheme } from './styles/theme';
<ChakraProvider theme={myTheme}>
    <App />
</ChakraProvider>
// using theme
import { Heading, Text } from '@chakra-ui/react'
function App() {
  return (
    <>
      <Heading color="primary.secondary">Title</Heading>
      <Text>Text</Text>
    </>
  )
}
//
function Landing() {
    const badgeList = (
        <Wrap mt={14} maxW={600}>
            {SKILLS.map(skill => (
                <WrapItem key={skill.label}>
                    <Badge bg={skill.label}>{skill.label}</Badge>
                </WrapItem>
            ))}
        </Wrap>
    );
}
```

### setup fonts of Chakra

- `npm install @fontsource/poppins @fontsource/inter`

```typescript
//at top of main.tsx
import '@fontsource/inter'
import '@fontsource/poppins'
//or
import '@fontsource/inter/400.css'
import '@fontsource/poppins/700.css'
// styles/theme.ts
const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Inter', sans-serif`,
};
export const myTheme = extendTheme({ colors, fonts });
```

[⬆ back to top](#top)

### some tips of ChakraUI responsive

```typescript
<Box mt={{base: 20, md: 0}}>
<Heading fontSize={{base: "2xl", md: "4xl", xl: "6xl"}} 
```

[⬆ back to top](#top)

## i18n

- `npm install react-i18next i18next --save`
  - https://react.i18next.com/guides/quick-start
- create folder 'locales' 'locales\en\' and 'locales\fr\'
- create file 'locales\i18n-config.ts'
- create file 'locales\en\home.json' and 'locales\fr\home.json'
- using in components/features
  - as following
- `npm install i18next-browser-languagedetector`- 检查浏览器的语言并设置转换为该语言
  - https://github.com/i18next/i18next-browser-languageDetector

```typescript
import { useTranslation } from "react-i18next";
function Landing() {
  const { t } = useTranslation("home");
  //...
  {t("greetings")}
}
```

[⬆ back to top](#top)

## using GSAP

- `npm install gsap @gsap/react`
- https://stackblitz.com/@GreenSockLearning/collections/gsap-react-starters
