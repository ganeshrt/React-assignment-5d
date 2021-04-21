import React, { Component } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import "./registration.css"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import axios from 'axios';
require('dotenv').config();
export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            city: "",
            email: "",

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
        const token = localStorage.getItem("token");
        console.log(process.env.BASE_URL);
        const result = await axios({
            method: 'post',
            url: `http://localhost:8000/users`,
            headers: {
                authorization: 'Bearer ' + token
            },
            data: {
                name: firstName + " " + lastName,
                city,
                password,
                email,
                phone,
            }
        });
        console.log("ress :", result)
    }

    render() {
        console.log("state", this.state)

        const { showPassword, password, phone } = this.state;
        return (
            <Container className="container" component="main" maxWidth="xs">
                <Grid container spacing={2}>

                    <Grid container justify="center">
                        <Grid  >
                            <Typography component="h1" variant="h5">
                                Sign up {"\n"}
                            </Typography>
                            <Typography component="span" variant="span">
                                to be member
                            </Typography>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container spacing={2} >

                        <Grid className="grid" item xs={6} sm={6} >
                            <TextField
                                className="margin"
                                id="input-with-icon-textfield"
                                label="First Name"
                                onChange={this.handleChange("firstName")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                className="margin"
                                id="input-with-icon-textfield"
                                label="Last Name"
                                onChange={this.handleChange("lastName")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <FormControl className="textField">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    className="margin"
                                    type="number"
                                    id="input-with-icon-textfield"
                                    label="Phone"
                                    value={phone}
                                    onChange={this.handleChange("phone")}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <TextField
                                className="margin"
                                id="input-with-icon-textfield"
                                label="Email"
                                onChange={this.handleChange("email")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <TextField
                                className="margin"
                                id="input-with-icon-textfield"
                                label="City"
                                onChange={this.handleChange("city")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationCityIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
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
                                    Sign Up
                            </Button>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Already a member? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

