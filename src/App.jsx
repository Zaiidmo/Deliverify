import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Home />
      <ToastContainer
        position="top-right" // You can change the position
        autoClose={5000} // Duration before it auto closes
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Show newest toasts on top
        closeOnClick // Allow closing on click
        rtl={false} // Right-to-left text
        pauseOnFocusLoss // Pause on window focus loss
        draggable // Allow dragging
        pauseOnHover // Pause on hover
        theme="light" // Theme can be light or dark
      />
    </>
  );
}

export default App;
