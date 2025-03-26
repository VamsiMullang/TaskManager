import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { QuoteBox, TaskList, FilterButtons } from "./components";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Task Management App
          </h1>
          <QuoteBox />
          <FilterButtons />
          <TaskList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
