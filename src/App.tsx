import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Main } from "./Main";
import { Statistics } from "./Statistics";
import { Header } from "./Header";
import { Layout } from "./Layout";
import "./main.global.css";

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  return (
    <>
      {mounted && (
        <Layout>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to="/main" />
              </Route>

              <Route exact path="/main">
                <Main />
              </Route>
              <Route exact path="/statistics">
                <Statistics />
              </Route>

              <Route path="*">
                <div style={{ textAlign: "center" }}>
                  <h2>404 — страница не найдена</h2>
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
        </Layout>
      )}
    </>
  );
}

export default App;
