import {useCallback} from 'react'
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
import useNTU from '../Hooks/useNTU'
import {
    Form,
  } from 'reactstrap';
import {UPLOADFILE_MUTATION, UPDATE_USER_MUTATION} from './../graphql'
import { useMutation } from '@apollo/client';

const Image_Button = styled(Button)`
    display: flex;
    margin: auto;
`



const Profile = ({me}) => {
    const {images, setIamges, aboutMe, setAboutMe, department, setDepartment, gender, setGender, age, setAge, birth, setBirth} = useNTU()
    const updateUser = useMutation(UPDATE_USER_MUTATION)
    const uploadFile = useMutation(UPLOADFILE_MUTATION)
    if(me.images){
        setIamges(me.images.concat(new Array(6 - me.images.length)))
    }else{
        setIamges(new Array(6).fill(""))
    }
    
    setAboutMe(me.aboutMe)
    setDepartment(me.department)
    setGender(me.gender)
    setAge(me.age)
    const add_image = useCallback(() => {
        // uploadFile()
    }, [])

    const getAge = () => {
        let now = new Date.getTime()
        return Math.ceil((now - birth)/31536000000)
    }

    const handleFormSubmit = useCallback(() => {
        setAge(getAge())
        updateUser({
            variables: {
                email: me.Email,
                gender,
                age,
                aboutMe,
                department,
              },
        })
    },[images, aboutMe, department, gender, birth]);

    return (
            <Container maxWidth = "sm">
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={200}>
                    {images.map((image, id) => 
                        image?(
                        <ImageListItem key = {id}>
                            <img
                                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                loading="lazy"
                            />
                        </ImageListItem>
                        ): (
                            <ImageListItem sx = {{border: '1px dashed gray'}}>
                            <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    // multiple
                                    type="file"
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
                                value = {aboutMe}
                                onChange = {(e) => setAboutMe(e.target.value)}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>

                            <TextField
                                id="Department"
                                label="Department"
                                // defaultValue=""
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
