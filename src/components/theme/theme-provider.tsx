import {
  ThemeProvider as BaseThemeProvider,
  ThemeProviderProps,
} from 'next-themes'

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <BaseThemeProvider attribute='class' defaultTheme='system' enableSystem>{children}</BaseThemeProvider>
}
