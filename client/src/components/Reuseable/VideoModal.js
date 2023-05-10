import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ModalVideo from "react-modal-video";

/**
 * @param {{isOpen: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; videoId: string; autoplay?: boolean;channel?:string;ratio?:string;onClose?:() => void;}} props
 */

const VideoModal = ({
  isOpen = false,
  setOpen,
  videoId = "",
  autoplay = true,
  channel = "youtube",
  ratio = "16:9",
  onClose,
  ...props
}) => {

  const playerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("videoPlayer", {
          videoId: videoId,
          events: {
            onReady: (event) => {
              if (autoplay) {
                event.target.playVideo();
              }
            },
          },
        });
      };

      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      } else {
        onYouTubeIframeAPIReady();
      }
    }
  }, [isOpen, videoId, autoplay]);

  const handleModalClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handlePlayVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };
  return (
    <>
      {typeof window !== "undefined" && (
        <ModalVideo
          channel={channel}
          autoplay={autoplay}
          ratio={ratio}
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => {
            setOpen(false);
            onClose?.();
          }}
          {...props}
        />
      )}
    </>
  );
};

export default VideoModal;
