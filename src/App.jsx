import { createBrowserRouter, RouterProvider } from "react-router-dom"
import FetchRQ from "./components/pages/FetchRQ";
import Home from "./components/pages/Home";
import FetchOld from "./components/pages/FetchOld";
import MainLayouts from "./components/Layouts/MainLayouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
    ],
  },
]);


function App() {
  const queryClient = new QueryClient()
  return (
    <div className="bg-gray-300 min-h-screen">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
        </RouterProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  )
}

export default App
