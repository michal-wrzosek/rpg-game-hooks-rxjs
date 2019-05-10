import React from "react";
import { Observable } from "rxjs/Observable";

const observable = Observable.create(observer => {
  observer.next("Test");
});

observable.subs;

import "./App.css";

function App() {
  return <div className="App" />;
}

export default App;
