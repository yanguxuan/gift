import React, { useState, useEffect } from 'react';
import { Music, Music as MusicOff, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

// Custom hook for typewriter effect
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
};

// Particle component for the final blessing
const Particle = ({ delay }: { delay: number }) => {
  return (
    <div 
      className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70 animate-bounce"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}ms`,
        animationDuration: `${3000 + Math.random() * 2000}ms`
      }}
    />
  );
};

function App() {
  const [currentLayer, setCurrentLayer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Sample photos - replace these URLs with actual photos
  const photos = [
    { url: 'https://placehold.co/400x300/D2B48C/8B4513?text=Replace+with+Dad+Photo+1', caption: '童年时光 - 1985' },
    { url: 'https://placehold.co/400x300/D2B48C/8B4513?text=Replace+with+Dad+Photo+2', caption: '一起钓鱼 - 1995' },
    { url: 'https://placehold.co/400x300/D2B48C/8B4513?text=Replace+with+Dad+Photo+3', caption: '毕业典礼 - 2010' },
    { url: 'https://placehold.co/400x300/D2B48C/8B4513?text=Replace+with+Dad+Photo+4', caption: '全家福 - 2020' },
  ];

  const letterText = `亲爱的爸爸，

时光荏苒，我已经长大成人，但在您面前，我永远是那个需要您指引的孩子。

您教会了我什么是坚强，什么是责任，什么是无条件的爱。您的每一句话、每一个拥抱，都成为了我人生路上最宝贵的财富。

您总是默默承担着家庭的重担，用您宽厚的肩膀撑起我们的整个世界。您的爱如山般厚重，如海般深邃。

感谢您给了我生命，给了我最好的成长环境，更感谢您用您的言行诠释了什么是真正的父爱。

在这个特别的日子里，我想对您说：您辛苦了，我爱您！

您永远的孩子`;

  const { displayedText, isComplete } = useTypewriter(letterText, 30);

  const nextLayer = () => {
    setCurrentLayer(prev => prev + 1);
  };

  const nextPhoto = () => {
    setPhotoIndex(prev => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Here you would implement actual audio control
    // const audio = document.getElementById('background-music') as HTMLAudioElement;
    // if (audio) {
    //   if (isPlaying) {
    //     audio.pause();
    //   } else {
    //     audio.play();
    //   }
    // }
  };

  const restart = () => {
    setCurrentLayer(0);
    setPhotoIndex(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
      {/* Background particles for final layer */}
      {currentLayer === 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <Particle key={i} delay={i * 200} />
          ))}
        </div>
      )}

      {/* Music control */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: '#D2B48C', color: '#8B4513' }}
      >
        {isPlaying ? <MusicOff size={24} /> : <Music size={24} />}
      </button>

      {/* Audio element - replace src with actual music file */}
      {/* <audio id="background-music" loop>
        <source src="path-to-your-music-file.mp3" type="audio/mpeg" />
      </audio> */}

      {/* Layer 0: Gift Box */}
      {currentLayer === 0 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div 
            className="text-center cursor-pointer transition-all duration-500 hover:scale-105"
            onClick={nextLayer}
          >
            <div 
              className="w-80 h-64 mx-auto mb-6 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden transform transition-all duration-700 hover:shadow-3xl"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-transparent opacity-30"></div>
              <div className="text-center z-10">
                <div className="text-6xl mb-4">🎁</div>
                <div className="text-xl font-serif" style={{ color: '#8B4513' }}>
                  一份给爸爸的<br />特别礼物
                </div>
              </div>
            </div>
            <p className="text-lg font-serif animate-pulse" style={{ color: '#8B4513' }}>
              点击开启
            </p>
          </div>
        </div>
      )}

      {/* Layer 1: Opening Greeting */}
      {currentLayer === 1 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center animate-fade-in">
            <div 
              className="w-96 h-80 mx-auto mb-8 rounded-lg shadow-2xl flex items-center justify-center p-8"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <div className="text-center">
                <h1 className="text-4xl font-serif mb-6 leading-relaxed" style={{ color: '#8B4513' }}>
                  致我生命中的<br />
                  <span className="text-5xl font-bold">灯塔与靠山</span>
                </h1>
                <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#8B4513' }}></div>
                <p className="text-lg font-serif opacity-80" style={{ color: '#8B4513' }}>
                  父亲节快乐
                </p>
              </div>
            </div>
            <button
              onClick={nextLayer}
              className="px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
            >
              继续 →
            </button>
          </div>
        </div>
      )}

      {/* Layer 2: Letter */}
      {currentLayer === 2 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-2xl w-full">
            <div 
              className="p-8 rounded-lg shadow-2xl min-h-96"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <div 
                className="font-serif text-lg leading-relaxed whitespace-pre-line"
                style={{ color: '#8B4513' }}
              >
                {displayedText}
                <span className="animate-pulse">|</span>
              </div>
              {isComplete && (
                <div className="text-center mt-8 animate-fade-in">
                  <button
                    onClick={nextLayer}
                    className="px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
                  >
                    翻看我们的回忆 →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Layer 3: Photo Carousel */}
      {currentLayer === 3 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-lg w-full">
            <div 
              className="p-6 rounded-lg shadow-2xl"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <h2 className="text-2xl font-serif text-center mb-6" style={{ color: '#8B4513' }}>
                珍贵回忆
              </h2>
              
              <div className="relative">
                <img
                  src={photos[photoIndex].url}
                  alt={photos[photoIndex].caption}
                  className="w-full h-64 object-cover rounded-lg shadow-lg transition-all duration-500"
                />
                
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <p className="text-center mt-4 font-serif text-lg" style={{ color: '#8B4513' }}>
                {photos[photoIndex].caption}
              </p>
              
              <div className="flex justify-center mt-4 space-x-2">
                {photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === photoIndex ? 'opacity-100' : 'opacity-40'
                    }`}
                    style={{ backgroundColor: '#8B4513' }}
                  />
                ))}
              </div>
              
              {photoIndex === photos.length - 1 && (
                <div className="text-center mt-6 animate-fade-in">
                  <button
                    onClick={nextLayer}
                    className="px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
                  >
                    送上我的祝福 →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Layer 4: Final Blessing */}
      {currentLayer === 4 && (
        <div className="flex items-center justify-center min-h-screen p-4 relative">
          <div className="text-center animate-fade-in z-10">
            <div 
              className="p-12 rounded-lg shadow-2xl max-w-lg mx-auto"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <div className="text-6xl mb-6">🌟</div>
              <h1 className="text-4xl font-serif mb-6 leading-relaxed" style={{ color: '#8B4513' }}>
                父亲节快乐！
              </h1>
              <p className="text-xl font-serif mb-8 leading-relaxed" style={{ color: '#8B4513' }}>
                愿您永远健康、快乐！<br />
                愿我们的回忆永远温暖如春！<br />
                愿您的每一天都充满阳光！
              </p>
              <div className="text-4xl mb-6">❤️</div>
            </div>
            
            <button
              onClick={restart}
              className="mt-8 px-6 py-2 rounded-full font-serif transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
              style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
            >
              <RotateCcw size={16} />
              <span>再看一遍</span>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        @media (max-width: 768px) {
          .w-80 { width: 280px; }
          .h-64 { height: 200px; }
          .w-96 { width: 320px; }
          .h-80 { height: 280px; }
          .text-4xl { font-size: 2rem; }
          .text-5xl { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}

export default App;