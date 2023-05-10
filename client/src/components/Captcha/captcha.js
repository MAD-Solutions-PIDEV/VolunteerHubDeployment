import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./captcha.module.css";
import classNames from "classnames";

function Captcha({ onCheck, selectedOption, onSelectedOptionChange }) {
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const emojiSelected = classNames(styles.emoji, styles.selectedOption);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/generate");
      const { emojis } = response.data;
      setDescription(emojis.description);
      setOptions(emojis.options);
      onSelectedOptionChange(-1); // reset the selected option in the parent component
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionClick = (index) => {
    onSelectedOptionChange(index);
  };

  const handleCheck = () => {
    if (selectedOption === -1) {
      setMessage("Please select an option");
      return;
    }

    if (options[selectedOption].description === description) {
      onCheck(true);
    } else {
      onCheck(false);
      handleGenerate();
    }
  };

  return (
    <div className="justify-content-center">
      <div align="center">
        <h4>{description}</h4>

        {options.map((option, index) => (
          <span
            align="center"
            key={index}
            className={`emoji ${
              selectedOption === index ? emojiSelected : styles.emoji
            }`}
            onClick={() => handleOptionClick(index)}
          >
            {option.name}
          </span>
        ))}
        <br />

        <button
          className={styles.verify_btn}
          type="button"
          onClick={handleCheck}
        >
          Verify
        </button>
      </div>
      <p className="message" id="result">
        {message}
      </p>
    </div>
  );
}

export default Captcha;
