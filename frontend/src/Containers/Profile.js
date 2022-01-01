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

const Image_Button = styled(Button)`
    display: flex;
    margin: auto;
`



const Profile = () => {
    const {images, setIamges, aboutMe, setAboutMe, interest, setInterest, department, setDepartment, gender, setGender, sexualOrigentation, setSexualOrientation, birth, setBirth} = useNTU()
    const add_image = useCallback(() => {
    
    }, [])
    const handleFormSubmit = useCallback(() => {
        
    },[images, aboutMe, interest, department, gender, sexualOrigentation]);

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
                                id="Interest"
                                label="Interest"
                                // defaultValue=""
                                value = {interest}
                                onChange = {(e) => setInterest(e.target.value)}
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
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>
                            <MenuItem value={3}>All</MenuItem>
                        </Select>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-required-label">Gender you want to date?</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="GenderWant"
                                
                                value={sexualOrigentation}
                                label="Gender you want to date?"
                                onChange={(e) => setSexualOrientation(e.target.value)}
                                >
                                <MenuItem value={1}>Male</MenuItem>
                                <MenuItem value={2}>Female</MenuItem>
                                <MenuItem value={3}>Third gender</MenuItem>
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
                            disabled={gender === 0 || sexualOrigentation === 0}
                            >
                            Submit
                        </Button>
                    </Stack>
                </Form>
            </Container>
    );
}

export default Profile;
