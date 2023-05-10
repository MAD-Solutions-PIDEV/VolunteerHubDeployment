import React, { useState } from 'react';
import Wheel from './Wheel';
import EventService from 'services/event.service';
import { ProgressBar } from 'react-bootstrap';
import { useEffect } from 'react';
import Modal from 'react-modal';
import VideoModal from "../Reuseable/VideoModal";
import { useNavigate } from 'react-router-dom';


function CreatePost({ username = "" }) {

  const [imageURL, setImageURL] = useState('');
  const [inputValue, setInputValue] = useState('nft style, beautiful perfect face cyberpunk female or male or kid , afirca joy portrait  with , beautiful blue eyes, shaved side haircut, hyper detail, cinematic lighting, magic , oil painting by Okuda San Miguel, spray splatter, with neon smoke, , Hyperdetailed, artwork, fantasy, support, growth,progress power front facing portrait, synthwave, hyperdetailed, intricate, kaleidoscope, extremely beautiful, ranking ligth, cinematic lighting, photo realistic, white background max detail,black skin ranking ligth, cinematic lighting, photo realistic, by mandy jurgens, moebus, jon foster, alphonse mucha, glazing, pablo picasso, pinot noir, chiaroscuro, leonardo da vinci, Michelangelo, 8k');
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [timerEnded, setTimerEnded] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [player, setPlayer] = useState(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [progress, setProgress] = useState(0);


  const handleOpenModal = () => {
    setShowModal(true);
  };




  const handlePlayerReady = () => {
    const playerInstance = new window.YT.Player('player', {
      videoId: 'uRQH2CFvedY&themeRefresh',
      events: {
        onReady: () => {
          playerInstance.playVideo(); // Play the video when it is ready
          playerInstance.setPlaybackQuality('hd1080'); // Set the desired playback quality
          playerInstance.setPlaybackRate(1.5); // Set the desired playback rate
          playerInstance.setVolume(100); // Set the desired volume (0-100)
          playerInstance.setLoop(true); // Enable looping if desired
          playerInstance.fullscreen(); // Trigger fullscreen mode
        },
        onStateChange: handlePlayerStateChange,
      },
    });
    setPlayer(playerInstance);
  };
  const handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setHasPlayed(true);
    }
  };

  useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [player]);


  const handleCloseModal = () => {
    setShowModal(false);
  }


  const postNFT = async () => {
    console.log(user.username)
    try {
      const response = await fetch('http://localhost:4000/postNFT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
        }),
      });
    } catch (error) {
      //print error to front end
      document.querySelector('.msg').textContent = error;
    } finally {
      setIsLoading(false);
    }
    EventService.winnerSaved()
  }

  const handleClick = () => {
    setShowModal(true);
    postNFT()
    EventService.winnerSaved(username)

  }

  const handleSpin = (username) => {
    setWinner(username);
  };

  const img = document.createElement('img');
  img.onload = () => {
    setMessage("loading")
    console.log('Image loaded successfully');
  };
  const generateImage = async (prompt) => {

    try {
      setLoading(0)
      handleButtonClick()
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          username: username,
        }),
      });

      if (!response.ok) {
        throw new Error('That image could not be generated');
      }

      const image = await response.json();
      const imageUrl = image.data;
      setImageURL(imageUrl);
    } catch (error) {
      //print error to front end
      document.querySelector('.msg').textContent = error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!showButton) {
      const interval = setInterval(() => {
        setLoading(prevProgress => prevProgress + 5);
      }, 500);

      setTimeout(() => {
        setTimerEnded(true);
        clearInterval(interval);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [showButton]);

  const handleSubmit = async (e) => {
    try {
      EventService.saveWinner(user._id)
    } catch (err) { }
    e.preventDefault();
    const prompt = inputValue.trim();
    if (prompt === '') {
      alert('Please add some text');
      return;
    }
    await generateImage(prompt);
  };

  const handleButtonClick = () => {
    setShowButton(false);
  };
  const navigate = useNavigate();
  function handleVideoEnd() {

    navigate("/organizations/all");
  }

  return (
    <div>
      <div className="promptDiv">
        <form onSubmit={handleSubmit} id="imagePrompt">
          <h2 id="ImagineAnImage">Generate your NFT</h2>
          <input style={{ display: "none" }}
            type="text"
            id="promptInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br />
          <button className="generateButton" type="submit" style={{
            fontSize: "3rem",
            color: "white",
            backgroundColor: "white"
          }}>
            🔄
          </button>
          <ProgressBar now={loading} label={`${loading}%`} style={{ backgroundColor: "rgb(219 219 219);", color: "black", width: "50%" }} />
        </form>
      </div>
      <div className="image-container">
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            {imageURL ? (
              <><div className="promptDiv">
                <form id="imagePrompt">
                  <h2 className="msg"></h2>
                  <img src={imageURL} alt="Generated Image" id="image" />
                  <h1>{message}</h1>
                  {timerEnded &&
                    <button class="main-btn" type="button" onClick={handleClick}>CLAIM REWARD</button>
                  }
                </form></div>
              </>
            ) : (
              <h2 className="msg">Generating image ...</h2>
            )}
            <Modal
              isOpen={showModal}
              onRequestClose={handleCloseModal}
              style={{
                overlay: {
                  zIndex: 9999
                },
                content: {
                  width: '100%',
                  height: '100%',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  padding: '0',
                  border: 'none'
                }
              }}
            >
              <button onClick={handleCloseModal}>Close</button>

              <div>
                {!hasPlayed && (
                  <div>
                    <div id="player" />
                    <div className="promptDiv">
                      <form id="imagePrompt">
                        <button onClick={handlePlayerReady}>Play Video and watch what's going on in the background.</button>
                      </form>
                    </div>
                  </div>
                )}
                {hasPlayed && (
                  <div>
                    <div id="player" />
                    <div style={{ width: '100%', backgroundColor: 'gray', height: '10px' }}>
                      <div style={{ width: `${progress}%`, backgroundColor: 'green', height: '10px' }}></div>
                    </div>
                  </div>
                )}
                <VideoModal isOpen={showModal} youtube={{ autoplay: 1, mute: 1 }} videoId="D1BEp2PrQ5s" onEnded={handleVideoEnd} />
              </div>
            </Modal>
            <script src="https://www.youtube.com/iframe_api"></script>
          </>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
