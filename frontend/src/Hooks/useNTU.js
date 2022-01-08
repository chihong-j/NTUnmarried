import {useState} from "react"

const useNTU = () => {
    const [images, setIamges] = useState(["https://i.imgur.com/t0qyHML.jpg", "", "", "", "", ""])
    const [aboutMe, setAboutMe] = useState("")
    const [department, setDepartment] = useState("")
    const [gender, setGender] = useState(true); //{true: male, false: female}
    const [age, setAge] = useState(0);
    const [birth, setBirth] = useState(new Date());
    const initialize = (me) => {
        if(me.images){
            setIamges(me.images.concat(new Array(6 - me.images.length)))
        }else{
            setIamges(new Array(6).fill(""))
        }
        
        setAboutMe(me.aboutMe)
        setDepartment(me.department)
        setGender(me.gender)
        setAge(me.age)
    }

    return {images, setIamges, aboutMe, setAboutMe,  department, setDepartment, gender, setGender, age, setAge, birth, setBirth, initialize}
}

export default useNTU;
