import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import FormBuilder from "./page/FormBuilder";
import { Designer } from "./page";
import MyFormBuilder from "./page/MyFormBuilder";
import { FormBuilderLeave, ListLeave, ListTaskPM } from "./page/demo_leave";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formBuilder/create" element={<Designer />} />
        <Route path="/my-formBuilder" element={<MyFormBuilder />} />
        <Route path="/my-formBuilder/:id" element={<FormBuilder />} />
        <Route path="demoLeave/listLeave" element={<ListLeave />} />
        <Route path="demoLeave/listTask" element={<ListTaskPM />} />
        <Route
          path="demoLeave/FormLeave/create"
          element={<FormBuilderLeave />}
        />
        <Route
          path="demoLeave/FormLeave/check"
          element={<FormBuilderLeave type="check" />}
        />
        <Route
          path="demoLeave/FormLeave/checked"
          element={<FormBuilderLeave type="checked" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
