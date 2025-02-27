import { useState, useEffect} from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const[todo,setTodo]=useState("") //use state manages data in our app(react hook)
  const[todos,setTodos]=useState([]) //updated  so we now create dynamic todos display , set todos update the data 
  //set todos is a way to change those tasks
 
  
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if (todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, [])

  const saveToLS=(params)=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  


  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
setTodos(newTodos) 
saveToLS()
        
  }

   const handleChange=(e)=>{ //added value={todo}
    setTodo(e.target.value) //updates the input value 

   }

    const handleDelete=(e, id)=>{
        let newTodos=todos.filter(item=>{
          return item.id!==id
        });
    setTodos(newTodos) //also make a confirm feature
    saveToLS()

    }
    
      const handleAdd=()=>{
        setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }]) //it updates the to do array, (state updater fn)
        setTodo("")
        console.log(todos)
        saveToLS()
      }

      const handleCheckbox = (e) => {
        let id=e.target.name;
        console.log(`this id is ${id}`)
        let index=todos.findIndex(item=>{
          return item.id===id;
        }) 
      let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
  setTodos(newTodos)    
  console.log(newTodos)
  saveToLS()

 }

      

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-3xl p-10 bg-slate-500 text-xl bold min-h-screen ">
      <div className="addTodo my-4">
      <h2 className='text-xl font-bold'>Add a Todo</h2>
      <input onChange={handleChange} value={todo} type="text" className='w-1/4 rounded-lg'/>
      <button onClick={handleAdd} className='bg-black hover:bg-slate-600 p-3 py-2 text-sm font-bold text-white rounded-md mx-2'>Add</button>
      </div>
      <h2 className='text-lg font-bold'>Your Todos</h2>
      <div className="todos">
      {todos.length ===0 && <div className='m-5'>No ToDos to display</div>}

        {todos.map(item=>{


        return <div key={item.id} className="todo flex w-1/4 my-3  justify-between">
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted}id=''/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className='buttons flex h-full'>
            <button onClick={(e)=>handleEdit(e ,item.id)} className='bg-black hover:bg-slate-600 p-2 py-1 text-sm font-bold text-white rounded-xl mx-1'>Edit</button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-black hover:bg-slate-600 p-2 py-1 text-sm font-bold text-white rounded-xl mx-1'>Delete</button>
          </div>
        </div>
        })} 
      </div>
      </div>
    </> 
    
  )
}

export default App
