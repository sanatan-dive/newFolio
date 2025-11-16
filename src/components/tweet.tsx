import { useState, useEffect } from 'react';
import { Tweet } from 'react-tweet';

export default function TweetCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of 10 tweet IDs (replace these with your desired tweet IDs)
  const tweetIds = [
    "1901353008568680473", 
    "1901287443216957597", 
    "1901383581576184039", 
    
    "1896673617272078783", 
    "1896449148838412377", 
    "1896767035268575275", 
    "1876257670182867078", 
    "1876327548550103306", 
    "1876274262455263658", 
    "1880868007410634793", 
  ];

  // Auto-scroll logic using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === tweetIds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [tweetIds.length]); // Dependency array includes tweetIds.length to handle dynamic changes

  return (
    <div className="tweet-carousel">
      <Tweet id={tweetIds[currentIndex]} />
    </div>
  );
}