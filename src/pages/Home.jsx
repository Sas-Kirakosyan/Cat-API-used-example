import React, { useState } from "react";

const TodoListApp = () => {
  const [expandedRows, setExpandedRows] = useState({});

  // Sample data
  const table = [
    { id: 1, title: "Math Homework", details: ["Algebra", "Geometry"] },
    { id: 2, title: "Science Project", details: ["Research", "Presentation"] },
    { id: 3, title: "History Reading", details: ["Chapter 3", "Chapter 4"] },
  ];

  // Toggle expanded state
  const toggleExpand = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="todo">
      <h1>Student To-Do List</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {/* <th>Task</th>
            <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {table.map((todo) => (
            <React.Fragment key={todo.id}>
              {/* Parent Row */}
              <tr style={{ borderBottom: "1px solid #ccc" }}>
                <td>{todo.title}</td>
                <td>
                  <button onClick={() => toggleExpand(todo.id)}>
                    {expandedRows[todo.id] ? "-" : "+"}
                  </button>
                </td>
              </tr>
              {/* Child Rows */}
              {expandedRows[todo.id] &&
                todo.details.map((detail, index) => (
                  <tr key={index} style={{ backgroundColor: "green" }}>
                    <td colSpan="2" style={{ paddingLeft: "20px" }}>
                      - {detail}
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {new Array(1000).map((el, i) => (
        <div key={i}>
          <div>dsdddddddddddddddddddddddddd</div>
          <h1>{i}</h1>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
          <div>dsdddddddddddddddddddddddddd</div>
        </div>
      ))}
    </div>
  );
};

export default TodoListApp;
