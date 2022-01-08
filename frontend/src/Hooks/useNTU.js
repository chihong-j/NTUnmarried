import {useState} from "react"

const useNTU = () => {
    const [images, setIamges] = useState(["https://i.imgur.com/t0qyHML.jpg", "", "", "", "", ""])
    const [aboutMe, setAboutMe] = useState("")
    const [interest, setInterest] = useState("")
    const [department, setDepartment] = useState("")
    const [gender, setGender] = useState(true); //{true: male, false: female}
    const [birth, setBirth] = useState(new Date());

    return {images, setIamges, aboutMe, setAboutMe, interest, setInterest, department, setDepartment, gender, setGender, birth, setBirth}
}

export default useNTU;
