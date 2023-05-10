const { useEffect, useState } = require("react");

function CampaignImage({ imageUrl }) {
    const [imageSrc, setImageSrc] = useState('');
  
    useEffect(() => {
      setImageSrc(imageUrl);
    }, [imageUrl]);
  
    return <img src={imageSrc} />;
  }
  export default CampaignImage;