import React, { useState, useEffect} from 'react';
import './App.css';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth} from "./Firebase";
import { doc, collection, onSnapshot,addDoc } from 'firebase/firestore'
import { FormControl, TextField, List } from '@material-ui/core'
import AddCircleIcon from "@material-ui/icons/AddCircle"
import TaskItem from './TaskItem'
import { Grid, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import ComponentForUser from './ComponentForUser';

const Tasks: React.FC = () => {

    // const navigate = useNavigate();

    const [tasks, setTasks] = useState([{ id: "", title: "" }]);
    const [input, setInput] = useState("")

    const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        addDoc(collection(db, "tasks"), {
        title: input,
        });
        setInput("");
    }
    
    useEffect(() => {
        const unSub = onSnapshot(collection(db, "tasks"), (snapshot) => {
        setTasks(
            snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            }))
        );
        });
        return () => unSub();
    }, []); //アプリケーション初回起動時のみにデータを読み取りに行くので第２引数は空配列


    const clickLogout = () => {
        signOut(auth).then(() => {
            console.log("ログアウトしました")
        })
        .catch( (error)=> {
            console.log(`ログアウト時にエラーが発生しました($(error))`);
        });
    }
    
    const user = auth.currentUser;

    if (user == null) {
        <div>ログインしていません。</div>
    }



    return (
        <div className="App">
        <Grid container  alignContent='center'>
            <Grid item container xs={6} justifyContent='center' direction="row" style={{marginLeft:'auto', marginRight:'auto'}}>
                <h1>Todo List</h1>



                <ComponentForUser />
            </Grid>



            {/* <Button 
                variant="outlined"
                size="small"
                onClick={clickLogout}
            >
            ログアウト
            </Button> */}

        </Grid>

        <FormControl>
        <TextField 
            InputLabelProps={{
            shrink: true,
            }}
            label="新しいタスク"
            value={input} //Valueには更新したいStateを指定
            onChange={
            ( 
                e: React.ChangeEvent<HTMLInputElement>
            ) => setInput(e.target.value)
            }
            />
        </FormControl>
            
            <button
                disabled={!input}
                onClick={newTask}
            >
            <AddCircleIcon />
            </button>

            <Grid item container xs={12} justifyContent="center">
                <List>
                    {tasks.map((task) => (
                    <TaskItem key={task.id} id={task.id} title={task.title} />
                    ))}
                </List>
            </Grid>
        </div>
    )
};


export default Tasks;

// collection(db, "tasks").doc(db, "id")onSnapshot((snapshot) 