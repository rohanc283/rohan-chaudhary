import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

const ReactQueryProvider = (props) => {
  return (
    <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
  )
}

export default ReactQueryProvider