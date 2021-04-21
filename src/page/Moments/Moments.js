import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import axios from 'axios'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PhoneIcon from '@material-ui/icons/Phone';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
class Moments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: [],
            selectedFile: null
        }
    }

    handleChange = (props) => (event) => {
        this.setState({
            [props]: event.target.value
        })

    };
    onFileChange = event => {
        // Update the state 

        console.log(event.target.files);
        this.setState({ selectedFile: event.target.files[0] });
        console.log(this.state.selectedFile);
    };
    onFileUpload = async () => {
        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "momentImage",
            this.state.selectedFile
        );

        // Details of the uploaded file 
        console.log("formData:", formData);

        // Request made to the backend api 
        // Send formData object 
        // axios.post("api/uploadfile", formData);
        const { tags, title, selectedFile } = this.state;
        const token = localStorage.getItem("token");
        console.log(process.env.BASE_URL);
        const result = await axios({
            method: 'post',
            url: `http://localhost:8000/moment`,
            headers: {
                authorization: 'Bearer ' + token,
                // "content-type":"multipart"
                "Content-Type": "multipart/form-data"
            },
            data: {
                title,
                tags,
                imgFile: selectedFile
            }
        });
        console.log("ress :", result)
    };

    render() {
        return (
            <>

                <Container className="container" component="main" maxWidth="100xs">
                    <Grid container>
                        <Grid item xs={4}>

                            Drwaer
                            </Grid>
                        <Grid itemm xs={8}>
                            <Grid className="grid" item xs={12}  >
                                <TextField
                                    className="margin"
                                    id="input-with-icon-textfield"
                                    label="title"
                                    onChange={this.handleChange("title")}
                                />
                            </Grid>
                            <Grid className="grid" item xs={12}  >
                                <TextField
                                    className="margin"
                                    id="input-with-icon-textfield"
                                    label="tags"
                                    onChange={this.handleChange("tags")}
                                />
                            </Grid>

                            <Grid item xs={6} sm={6}>
                                <FormControl className="textField">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        className="margin"
                                        type="file"
                                        id="input-with-icon-textfield"
                                        label="Upload File"
                                        value={this.state.selectedFile}
                                        onChange={this.onFileChange}
                                    />
                                    {/* <input type="file" onChange={this.onFileChange} /> */}

                                </FormControl>
                            </Grid>

                            <Grid item xs={12} >
                                <Grid container justify="center">
                                    <Button variant="contained" color="primary" onClick={this.onFileUpload}>
                                        Submit
                            </Button>
                                </Grid>
                            </Grid>


                        </Grid>
                    </Grid>

                </Container>

            </>
        )
    }
}

export default Moments;