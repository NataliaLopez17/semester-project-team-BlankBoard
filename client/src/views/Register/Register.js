import { React, useState } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';
import {
    Grid,
    Card,
    TextField,
    Button,
    FormGroup,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@mui/material';
import isAuthenticated from '../../common/authentication'




const Register = () => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(["user"]);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [screen_name, setScreenName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const check = async () => {
        setAuthenticated(await isAuthenticated(cookies.token));
        setLoading(false);
    }

    if (loading) {
        check();
        return <h1>Loading...</h1>
    } else if (authenticated) {
        return <Redirect to={'/'} />
    } else {

        return (
            <>
                <Grid container className="cred_page cred_container" justifyContent="center">
                    <Grid item>
                        <Card className="cred_card">
                            <Grid container className="cred_container" padding="0px !important" justifyContent="center">
                                <Grid item xs={12}>
                                    <Typography className="cred_title" textAlign="center">
                                        Welcome to BlankBoard!
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className="cred_container" justifyContent="center">
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <TextField
                                            className="reg_input"
                                            label="Username"
                                            variant="standard"
                                            type="name"
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                         <TextField
                                            className="reg_input"
                                            label="Screen Name"
                                            variant="standard"
                                            type="name"
                                            id="screen_name"
                                            name="screen_name"
                                            placeholder="Screen Name"
                                            value={screen_name}
                                            onChange={(e) => setScreenName(e.target.value)}
                                        />
                                        <TextField
                                            className="reg_input"
                                            label="Email"
                                            variant="standard"
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <TextField
                                            className="reg_input"
                                            label="Password"
                                            variant="standard"
                                            type="password"
                                            id="pwd"
                                            name="pwd"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Button className="reg_input cred_button" type="button" variant="contained" onClick={handleRegister}>Sign Up</Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <DialogTitle>
                                                {"Invalid Credentials"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    It appears you have entered an incorrect email or password, please try again.
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <Grid container className="cred_container" justifyContent="center">
                                <Grid item>
                                    <Typography className="cred_register">
                                        Already have an account? <a href="/login">Log in</a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }

    function handleClose() {
        setOpen(false);
    }

    function handleRegister() {
        const body = {
            username,
            screen_name,
            email,
            password
        };
        const bodySend = JSON.stringify(body);
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API + "/auth/register",
            data: bodySend,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        }).then(res => {
            setCookie("token", res.data.jwtToken);
            history.push("/");
        }).catch(e => {
            setOpen(true);
        });
    }

};

export default Register;
