import ImageUpload from "components/Image/Image";
import { useRef ,useState} from "react";
import { useParams } from "react-router-dom";

const CustomImageUpload = () => {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file here
  };

    const { id } = useParams();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");
    const [firstAddress, setFirstAddress] = useState("");
    const [secondAddress, setSecondAddress] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
   
  const [newPassword, setNewPassword] = useState('');

    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState({
      firstAddress: "",
      secondAddress: "",
      country: "",
      zipCode: "",
      state: "",
    });
  

  return (
    <div>
      <button onClick={handleClick}>Custom Upload Button</button>
      <input
        ref={hiddenFileInput}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export const exploreskills = 
  [
    {skill: "Web Development"},
    {skill: "Front-end Development"},
    {skill: "Back-end Development"},
    {skill: "JavaScript"},
    {skill: "React"},
    {skill: "Angular"},
    {skill: "Vue.js"},
    {skill: "Node.js"},
    {skill: "Python"},
    {skill: "Java"},
    {skill: "C#"},
    {skill: "C++"},
    {skill: "PHP"},
    {skill: "Ruby"},
    {skill: "Swift"},
    {skill: "Objective-C"},
    {skill: "Mobile App Development"},
    {skill: "iOS Development"},
    {skill: "Android Development"},
    {skill: "Flutter"},
    {skill: "Kotlin"},
    {skill: "SwiftUI"},
    {skill: "UI/UX Design"},
    {skill: "UX Design"},
    {skill: "UI Design"},
    {skill: "Graphic Design"},
    {skill: "Adobe Photoshop"},
    {skill: "Adobe Illustrator"},
    {skill: "Adobe InDesign"},
    {skill: "Figma"},
    {skill: "Sketch"},
    {skill: "Product Design"},
    {skill: "Industrial Design"},
    {skill: "3D Design"},
    {skill: "Animation"},
    {skill: "Motion Graphics"},
    {skill: "Video Editing"},
    {skill: "Photography"},
    {skill: "Copywriting"},
    {skill: "Content Writing"},
    {skill: "Blogging"},
    {skill: "SEO"},
    {skill: "SEM"},
    {skill: "Social Media Marketing"},
    {skill: "Email Marketing"},
    {skill: "Digital Marketing"},
    {skill: "Marketing Analytics"},
    {skill: "Sales"},
    {skill: "Business Development"},
    {skill: "Project Management"},
    {skill: "Agile Methodologies"},
    {skill: "Scrum"},
    {skill: "Leadership"},
    {skill: "Team Management"},
    {skill: "Human Resources"},
    {skill: "Recruiting"},
    {skill: "Training and Development"},
    {skill: "Customer Service"},
    {skill: "Technical Support"},
    {skill: "IT Support"},
    {skill: "Networking"},
    {skill: "Cybersecurity"},
    {skill: "Cloud Computing"},
    {skill: "Database Management"},
    {skill: "Data Analysis"},
    {skill: "Data Science"},
    {skill: "Machine Learning"},
    {skill: "Artificial Intelligence"},
    {skill: "Blockchain"},
    {skill: "Cryptocurrency"},
    {skill: "Quantum Computing"},
    {skill: "Physics"},
    {skill: "Mathematics"},
    {skill: "Statistics"},
    {skill: "Economics"},
    {skill: "Finance"},
    {skill: "Accounting"},
    {skill: "Legal"},
    {skill: "Writing"},
    {skill: "Editing"},
    {skill: "Publishing"},
    {skill: "Journalism"},
    {skill: "Public Relations"},
    {skill: "Event Planning"},
    {skill: "Hospitality"},
    {skill: "Culinary Arts"},
    {skill: "Education"},
    {skill: "Teaching"},
    {skill: "Research"},
    {skill: "Medicine"},
    {skill: "Nursing"},
    {skill: "Pharmacy"},
    {skill: "Dentistry"},
    {skill: "Physical Therapy"},
    {skill: "Occupational Therapy"}
  ]


export const updateInfoArea = [

 ];
