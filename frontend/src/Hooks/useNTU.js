import {useState} from "react"

const useNTU = () => {
    const [images, setIamges] = useState(["https://i.imgur.com/t0qyHML.jpg", "", "", "", "", ""])
    const [aboutMe, setAboutMe] = useState("")
    const [interest, setInterest] = useState("")
    const [department, setDepartment] = useState("")
    const [gender, setGender] = useState(0); //{0: male, 1: female, 2, third}
    const [sexualOrigentation, setSexualOrientation] = useState(0); //{0: male, 1: female, 2, all}
    const [birth, setBirth] = useState(new Date());

    return {images, setIamges, aboutMe, setAboutMe, interest, setInterest, department, setDepartment, gender, setGender, sexualOrigentation, setSexualOrientation, birth, setBirth}
}

export default useNTU;
