import {useState} from "react"

const useNTU = () => {
    const [images, setIamges] = useState(["https://i.imgur.com/t0qyHML.jpg", "", "", "", "", ""])
    const [aboutMe, setAboutMe] = useState("")
    const [department, setDepartment] = useState("")
    const [gender, setGender] = useState(true); //{true: male, false: female}
    const [age, setAge] = useState(0);
    const [birth, setBirth] = useState(new Date());
    const [pairedEmail, setPairedEmail] = useState([]);
    const [pairedName, setPairedName] = useState([]);
    const initialize = (me) => {
        if(me.images){
            console.log(me);
            setIamges(me.images.concat(new Array(6 - me.images.length).fill("")))
        }else{
            setIamges(new Array(6).fill(""))
        }
        
        setAboutMe(me.aboutMe)
        setDepartment(me.department)
        setGender(me.gender)
        setAge(me.age)
        setPairedEmail(me.pairedEmail)
        setPairedName(me.pairedName)
        // setPairedName(['Kris', 'Showlo'])
        //
    }

    return {images, setIamges, aboutMe, setAboutMe,  department, setDepartment, gender, setGender, age, setAge, birth, setBirth, initialize, pairedName, pairedEmail, setPairedName, setPairedEmail}
}

export default useNTU;
