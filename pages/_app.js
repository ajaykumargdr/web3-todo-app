import "@/styles/globals.css";

// INTERNAL IMPORT
import { ToDoListProvider } from "@/context/ToDolistApp";
// require("dotenv").config();

const App = ({ Component, pageProps }) => {

  return (
    <ToDoListProvider>

      <div>
        <Component {...pageProps} />;
      </div>

    </ToDoListProvider>
  )

}

export default App;