import React from "react";
import { Pages } from "./src/pages/pages.js"
import GlobalLayout from "./src/layouts/global_layout.jsx"

function App() {
  return (
    <GlobalLayout>
      <Pages.Main/>
    </GlobalLayout>
  );
}

export default App;