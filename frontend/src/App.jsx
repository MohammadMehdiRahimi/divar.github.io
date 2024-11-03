import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import Router from "router/Router";
import Layout from "layouts/Layout";
import { Provider } from "react-redux";
import store from "reduxs/store.js";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Router />
          </Layout>
        </Provider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
