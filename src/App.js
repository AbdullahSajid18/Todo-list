import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [selectNumbers, setSelectNumbers] = useState(1); //Use default value 1
  const [valueOfInput, setValueOfInput] = useState("");
  const [thingsPacked, setThingsPacked] = useState([]);
  const [sortBy, setSortBy] = useState(" ");

  useEffect(() => {
    if (todoList.length > 0) {
      const itemsPacked = todoList.filter((item) => item.packed);
      setThingsPacked(itemsPacked);
    } else {
    }
  }, [todoList]);

  // function to remove items from list

  const clearListHandler = () => {
      const confirmationMsg = window.confirm(
        'If you want to delete the list then click ok!'
      );
      if (confirmationMsg) {
        setTodoList([]);
      }
  };

  // Function to add items inthe list

  const addItemsInListHandler = () => {
    if (valueOfInput) {
      const setNewItem = {
        text: `${selectNumbers} ${valueOfInput}`,
        itemsPacked: false,
      };
      setTodoList([...todoList, setNewItem]);
      setValueOfInput("");
      console.log("data add hora he");
    }
  };


  // Function to sort the list by packed status
  
  const sortingByPackedStatus = () => {
    const sortList = [...todoList].sort((x , y) => {
        if (x.packed && !y.packed) return -1;
        if (!x.packed && y.packed) return 1;
        return 0;

    });
    setTodoList(sortList);
    setSortBy('Sort by Packed Status');
  };


   // Function to sort the list by  description
  const sortingByDescription = () => {
    const sortedList = [...todoList].sort((x , y) => {
      const keywordX = x.text.split(' ').slice(1).join(' ');
      const keywordY = y.text.split(' ').slice(1).join(' ');
      return keywordX.localeCompare(keywordY);
    });
     setTodoList(sortedList);
     setSortBy('Sort By Description');
  };


  // function to sort the list by input order

  const sortingByInputOrder = () => {
      const sortedList = [...todoList].sort((x , y) => {
        const valueOfX = parseInt(x.text.split(' ')[0]); 
        const valueOfY = parseInt(y.text.split(' ')[0]);
        return valueOfX - valueOfY;
      });
      setTodoList(sortedList);
      setSortBy('Sort By input order');
  };

  // function to handle sorting Change

  const sortChangingHandler = (e) => {
    const specificSort = e.target.value;
    if (specificSort === 'Sort by Packed Status') {
      sortingByPackedStatus();
    }else if (specificSort === 'Sort By input order') {
      sortingByInputOrder();
    }else if (specificSort === 'Sort By Description') {
      sortingByDescription();
    } else {
      setSortBy(specificSort);  //This option will update the sorting option
    }
  }




  return (
    <div className="App">
      <header className="header">🌴 React JS TODO APP 🥳💼</header>
      <div className="subHeader">
        What do you need for your 😍 trip?
        <select
          value={selectNumbers}
          className="selectOfSubheader"
          onChange={(e) => setSelectNumbers(parseInt(e.target.value))}
        >
          {Array.from(Array(20).keys()).map((x) => (
            <option key={x} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
        <input
          className="subHeaderInput"
          type="text"
          placeholder="write your items...!🙂"
          value={valueOfInput}
          onChange={(e) => setValueOfInput(e.target.value)}
        />
        <button className='subHeaderbtn' onClick={addItemsInListHandler}>Add!</button>
      </div>
      ;
      <div className="mainContainer">
        {todoList.map((item, index) => (
          <div
            key={index}
            className={item.packed ? "packed" : ""}
            style={{ textDecoration: item.packed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              onChange={() => {
                const updatedList = [...todoList];
                updatedList[index].packed = !updatedList[index].packed;
                setTodoList(updatedList);
              }}
              checked={item.packed || false}
            />
            <span>{item.text}</span>
            <i
              className="fa-sharp sharp-x fa-solid fa-x" 
              onClick={()=> {
                const updatedList = [...todoList];
                updatedList.splice(index , 1)
                setTodoList(updatedList);
              }}
              ></i>
          </div>
        ))}
      </div>


      <div className="bottomBtnDiv">
        <div className="setOrderDiv">
          <select value={sortBy}  onChange={sortChangingHandler}>
            <option value='Sort By input order'>sort by input order</option>
            <option value='Sort By Description'>Sort by Description</option>
            <option value='Sort by Packed Status'>sort by Packed Status</option>
          </select>
          <button onClick={clearListHandler}>Clear List</button>
        </div>
     
      <div className="footer">
        You have {todoList.length} items on your list, and you already Packed {' '} 
        {thingsPacked.length} ({((thingsPacked.length / todoList.length) * 100).toFixed(2)}%)
      </div>
      </div>
    </div>
  );
}

export default App;
