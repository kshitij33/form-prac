// import React from 'react';
// import { useForm } from '@tanstack/react-form';
// import { Input } from './components/ui/input'; // Adjust the path as needed
// import { Button } from './components/ui/button'; // Adjust the path as needed

// export default function App() {
//   const form = useForm({
//     defaultValues: {
//       fullName: '',
//       email: '',
//     },
//     onSubmit: async ({ value }) => {
//       // Do something with form data
//       console.log(value);
//     },
//   });

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
//         <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             form.handleSubmit();
//           }}
//         >
//           <div className="mb-4">
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <form.Field
//               name="fullName"
//               children={(field) => (
//                 <Input
//                   id="fullName"
//                   name={field.name}
//                   value={field.state.value}
//                   onBlur={field.handleBlur}
//                   onChange={(e) => field.handleChange(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                 />
//               )}
//             />
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <form.Field
//               name="email"
//               children={(field) => (
//                 <Input
//                   id="email"
//                   name={field.name}
//                   value={field.state.value}
//                   onBlur={field.handleBlur}
//                   onChange={(e) => field.handleChange(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                 />
//               )}
//             />
//           </div>
          
//           <Button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Submit
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}


import { ProfileForm } from './components/pages/Profile'
import {NewForm} from './components/pages/NewForm'

const App = () => {
  return (
    // <div><ProfileForm /></div>
    <div>
      <ThemeProvider defaultTheme="dark">
      <NewForm />
      </ThemeProvider>
    </div>
  )
}

export default App