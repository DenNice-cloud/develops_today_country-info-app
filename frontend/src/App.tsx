import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<CountryList />}
         />
        <Route
          path="/country/:code"
          element={<CountryDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
