import { Route, Routes } from "react-router-dom";

import TasksPage from "./TasksPage";
import TaskForm from "./TaskForm";
import NotFound from "./NotFound";
import { TaskContextProvider } from "../context/TaskProvider";

import Navbar from "../components/Navbar";

//import '../components/css/AppCrud.css';

//import '../components/css/AppCrudindex.css';


function Crud() {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
}

export default Crud;
