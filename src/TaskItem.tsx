import React, { useState } from "react";
import { ListItem, TextField, Grid, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { db } from "./Firebase"
import { doc, setDoc, deleteDoc } from "firebase/firestore";

interface PROPS {
    id: string;
    title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
    //編集対象となるstateを宣言
    const [title, setTitle] = useState(props.title);
    //編集メソッドを編集
    const EditTask = async () => {
        await setDoc(doc(
            db, "tasks", props.id), {
            title: title,
            // marge: true
        })
    };

    //削除メソッドを定義
    const DeleteTask = async () => {
        await deleteDoc(doc(db, "tasks", props.id))
    }

    return (
        <div>
            <ListItem>

                <Grid container justifyContent="flex-start">

                    
                    <Grid item xs={6}>
                    <h2>{props.title}</h2>
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
                        label="Edit Task"
                        InputLabelProps={{ shrink: true}}
                        value={title}
                        // event型をTSで定義
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }  
                    />      
                    
                    <button>
                        <EditOutlinedIcon onClick={EditTask} />
                    </button>

                    <button>
                        <DeleteOutlineOutlinedIcon onClick={DeleteTask} />
                    </button>  
                    
                    </Grid>  


                </Grid>
            </ListItem>


        </div>
    )
}

export default TaskItem