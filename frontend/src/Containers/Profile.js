import {useCallback, useEffect} from 'react'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import {
    Form,
  } from 'reactstrap';
import {UPLOADFILE_MUTATION, UPDATE_USER_MUTATION} from './../graphql'
import { useMutation } from '@apollo/client';

const Image_Button = styled(Button)`
    display: flex;
    margin: auto;
`

const Profile = ({images, setIamges, aboutMe, setAboutMe, department, setDepartment, gender, setGender, age, setAge, birth, setBirth, initialize, me, isInitialized, setIsInitialized}) => {
    // const {images, setIamges, aboutMe, setAboutMe, department, setDepartment, gender, setGender, age, setAge, birth, setBirth, initialize} = useNTU()

    const [updateUser] = useMutation(UPDATE_USER_MUTATION)
    const [uploadFile] = useMutation(UPLOADFILE_MUTATION, {
        onCompleted: (data) => {
            let index = 0;
            while (images[index]) {
                index++;
            }
            const newImages = JSON.parse(JSON.stringify(images));
            newImages[index] = data.uploadFile;
            setIamges(newImages);
        }
    })
    const fileUploadHandler = ({target: {validity, files: [file]}}) =>{
        validity.valid && uploadFile({variables: {file}})
    }

    useEffect(() => {
        if (!isInitialized) {
            setIsInitialized(true);
            initialize(me);
        }

    }, [me]);


    const getAge = () => {
        let now = new Date().getTime()
        return Math.ceil((now - birth)/31536000000)
    }

    const handleFormSubmit = async() => {
        setAge(getAge())
        updateUser({
            variables: {
                email: me.email,
                gender,
                age,
                aboutMe,
                department,
              },
        })
    };



    return (
            <Container maxWidth = "sm">
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={200}>
                    {images.map((image, id) => 
                        image?(
                        <ImageListItem key = {id}>
                            <img
                                src={image}
                                loading="lazy"
                            />
                        </ImageListItem>
                        ): (
                            <ImageListItem key={id} sx = {{border: '1px dashed gray'}}>
                            <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    // multiple
                                    type="file"
                                    onChange={fileUploadHandler}
                                />
                                <label htmlFor="raised-button-file" style = {{"display": "flex", "margin": "auto"}}>
                                    <Image_Button color="primary" variant="raised" component="span">
                                        <AddCircleIcon sx = {{fontSize : "50px"}}/>
                                    </Image_Button>
                                </label>
                            </ImageListItem>
                        )
                    )}
                </ImageList>

                <Form onSubmit={handleFormSubmit}>
                    <Stack spacing={3}>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <TextField
                                id="About Me"
                                label="About Me"
                                // defaultValue = ""
                                required
                                value = {aboutMe}
                                onChange = {(e) => setAboutMe(e.target.value)}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>

                            <TextField
                                id="Department"
                                label="Department"
                                // defaultValue=""
                                required
                                value = {department}
                                onChange = {(e) => setDepartment(e.target.value)}
                                />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-required-label">Gender</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="Gender"
                            value={gender}
                            label="Gender"
                            onChange={(e) => setGender(e.target.value)}
                            >
                            <MenuItem value={true}>Male</MenuItem>
                            <MenuItem value={false}>Female</MenuItem>
                        </Select>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                label="Date of Birth"
                                inputFormat="MM/dd/yyyy"
                                value={birth}
                                onChange={(date) => setBirth(date)}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <Button
                            type="submit"
                            color="primary"
                            disabled = {!aboutMe || !department}
                            >
                            Save
                        </Button>
                    </Stack>
                </Form>
            </Container>
    );
}

export default Profile;
