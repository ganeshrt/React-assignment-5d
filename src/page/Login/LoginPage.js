import { Card, CardHeader, CardContent } from '@material-ui/core'
import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email'
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios'
export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: "",
            email: "",
            password: ""
        }
    }

    handleChange = (props) => (event) => {
        this.setState({
            [props]: event.target.value
        })
    };
    handleClickShowPassword = () => {
        const { showPassword } = this.state;
        this.setState({
            showPassword: !showPassword,

        })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    handleSubmit = async () => {
        const { firstName, lastName, city, email, phone, password } = this.state;
        // const token = localStorage.getItem("token");
        console.log(process.env.BASE_URL);
        const result = await axios({
            method: 'post',
            url: `http://localhost:8000/users/login`,
            data: {
                password,
                email,

            }
        });
        console.log("ress :", result)
        localStorage.setItem("token", result.data.accessToken)
        this.props.setToken(result.data.accessToken)
    }


    render() {
        const { email, password, showPassword } = this.state;
        return (

            <Container className="container" component="main" maxWidth="xs">
                <Card>
                    <CardHeader justify="center" title="Sign In" >
                        Sign In
                    </CardHeader>
                    <CardContent>
                        <Grid container justify="center" spacing={2} >

                            <Grid className="grid" item xs={12}  >
                                <TextField
                                    className="margin"
                                    id="input-with-icon-textfield"
                                    label="Email"
                                    onChange={this.handleChange("email")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} >
                                <FormControl className="textField">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={this.handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} >
                                <Grid container justify="center">
                                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                        Sign In
                            </Button>
                                </Grid>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            Not a member? Sign up
                                    </Link>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

// export default LoginPage