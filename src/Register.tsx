import React, { Fragment, useState } from 'react';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField} from '@material-ui/core';
import { on } from 'events';

const Register: React.FC = () => {

    const navigate = useNavigate();

    const Register = (event: any) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            navigate("/") //登録成功後のリダイレクトページ
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
    };

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }


    


return (

    <Fragment>
        <Container>
            <Grid container>
                <Grid item md={4}></Grid>
                <Grid item md={4}>
                <Grid item md={4} style={{marginTop:20}}>
                    ログイン             

                </Grid>
                <Box component="form">
                    <TextField
                        style={{marginTop: "0.5em", marginBottom: "0.5em" }}
                        name="email"
                        label="E-mail"
                        fullWidth
                        variant="outlined"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleChangeEmail(event);
                        }}
                    />
                    <TextField
                        style={{marginTop: "0.5em", margin: "0.5em"}}
                        name="password"
                        label="Password"
                        fullWidth
                        variant='outlined'
                        type="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleChangePassword(event);
                        }}
                    />
                <Button
                    fullWidth
                    style={{marginTop: "0.5em", marginBottom: "0.5em"}}
                    onClick={Register}
                    >
                    新規登録
                </Button>
                </Box>
            </Grid>
            <Grid item md={4}></Grid>
            </Grid>

        </Container>
    </Fragment>
    )
}

export default Register