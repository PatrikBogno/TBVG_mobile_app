import React from "react";
import { Pages } from "./src/pages/index.js"
import GlobalLayout from "./src/layouts/global_structure.jsx"

function App() {
  return (
    <GlobalLayout>
      <Pages.Main.Page/>
    </GlobalLayout>
  );
}

export default App;