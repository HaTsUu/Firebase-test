import React from 'react';
import { db, auth } from './Firebase'
import { User, signOut } from 'firebase/auth'
import { Box, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';

export const ComponentForUser = () => {
    const user = auth.currentUser;
    const navigate = useNavigate();

    if (user == null) {
        return (
        <Button 
            variant="outlined"
            size="small"
            onClick={() => navigate('/register')}
            style={{margin:10}}
        >
        ログイン
        </Button>
        )
    }

    const usersignout = () => {
        signOut(auth).then(() => {
            alert('Sign out');
        }).catch((error) => {
            alert(error.message);
        })
    }
    


    return (
    <>
        <Box style={{border: '1px solid gray', width:100, height:50, margin:20, textAlign:"center"}}>
            ログイン中
        </Box>

        <Button
            variant="outlined"
            size="small"
            onClick={usersignout}
            style={{width:100, height:50, margin:20, textAlign:"center"}}
        >
            ログアウト
        </Button>

    </>
    )
}

export default ComponentForUser