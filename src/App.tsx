import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import firebase from "firebase/app";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  return (
    <div className="App">
      {tasks.map((task) => (
        <h3>{task.title}</h3>
      ))}
    </div>
  );
};

firebase.initializeApp(db);
export default App;
