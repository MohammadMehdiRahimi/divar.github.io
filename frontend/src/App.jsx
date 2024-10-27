import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import Router from "router/Router";
import Layout from "layouts/Layout";
const client = new QueryClient({});
function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
        <ReactQueryDevtools />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
