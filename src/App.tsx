import React, { useState, useEffect, useRef } from 'react';
import { Music, Music as MusicOff, ChevronLeft, ChevronRight, RotateCcw, Heart, Star } from 'lucide-react';

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

// Enhanced particle component with different types
const Particle = ({ delay, type = 'star' }: { delay: number; type?: 'star' | 'heart' | 'sparkle' }) => {
  const getParticleContent = () => {
    switch (type) {
      case 'heart': return '❤️';
      case 'sparkle': return '✨';
      default: return '⭐';
    }
  };

  return (
    <div 
      className="absolute text-lg opacity-70 animate-float pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}ms`,
        animationDuration: `${4000 + Math.random() * 3000}ms`
      }}
    >
      {getParticleContent()}
    </div>
  );
};

// Floating hearts animation
const FloatingHeart = ({ delay }: { delay: number }) => {
  return (
    <div 
      className="absolute text-red-400 opacity-60 animate-pulse pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}ms`,
        animationDuration: `${3000 + Math.random() * 2000}ms`
      }}
    >
      <Heart size={16} fill="currentColor" />
    </div>
  );
};

// Sparkle effect for transitions
const SparkleEffect = ({ show }: { show: boolean }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 100}ms`,
            animationDuration: '2s'
          }}
        >
          <Star size={12} className="text-yellow-400 fill-current" />
        </div>
      ))}
    </div>
  );
};

function App() {
  const [currentLayer, setCurrentLayer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [giftBoxOpened, setGiftBoxOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Updated photos with actual file paths
  const photos = [
    { url: '/蹒跚学步2006-2009.png', caption: '蹒跚学步 - 2006-2009' },
    { url: '/童年嬉戏2009-2018.png', caption: '童年嬉戏 - 2009-2018' },
    { url: '/少年学习2018-2024.png', caption: '少年学习 - 2018-2024' },
    { url: '/漫漫旅途2024-.png', caption: '漫漫旅途 - 2024-' },
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
    setShowSparkles(true);
    setTimeout(() => {
      setCurrentLayer(prev => prev + 1);
      setShowSparkles(false);
    }, 1000);
  };

  const openGiftBox = () => {
    setGiftBoxOpened(true);
    setTimeout(() => {
      nextLayer();
    }, 1500);
  };

  const nextPhoto = () => {
    setPhotoIndex(prev => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restart = () => {
    setCurrentLayer(0);
    setPhotoIndex(0);
    setGiftBoxOpened(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
      {/* Background particles for different layers */}
      {currentLayer >= 1 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <FloatingHeart key={i} delay={i * 500} />
          ))}
        </div>
      )}

      {currentLayer === 4 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => (
            <Particle key={`star-${i}`} delay={i * 300} type="star" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <Particle key={`heart-${i}`} delay={i * 400 + 1000} type="heart" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <Particle key={`sparkle-${i}`} delay={i * 250 + 500} type="sparkle" />
          ))}
        </div>
      )}

      {/* Sparkle transition effect */}
      <SparkleEffect show={showSparkles} />

      {/* Music control with enhanced animation */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-500 hover:scale-110 ${
          isPlaying ? 'animate-pulse' : ''
        }`}
        style={{ backgroundColor: '#D2B48C', color: '#8B4513' }}
      >
        {isPlaying ? <MusicOff size={24} /> : <Music size={24} />}
      </button>

      {/* Audio element with actual music file */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Layer 0: Enhanced Gift Box */}
      {currentLayer === 0 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <div 
              className={`w-80 h-64 mx-auto mb-6 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-1000 hover:scale-105 ${
                giftBoxOpened ? 'animate-bounce-slow' : 'animate-gentle-pulse'
              }`}
              style={{ backgroundColor: '#D2B48C' }}
              onClick={openGiftBox}
            >
              {/* Gift box lid animation */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-yellow-200 to-transparent transition-all duration-1500 ${
                  giftBoxOpened ? 'transform -translate-y-full opacity-0' : 'opacity-30'
                }`}
              ></div>
              
              {/* Ribbon effect */}
              <div className="absolute inset-0">
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full opacity-40"
                  style={{ backgroundColor: '#8B4513' }}
                ></div>
                <div 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-8 opacity-40"
                  style={{ backgroundColor: '#8B4513' }}
                ></div>
              </div>
              
              <div className="text-center z-10">
                <div className={`text-6xl mb-4 transition-all duration-1000 ${giftBoxOpened ? 'animate-spin' : ''}`}>
                  🎁
                </div>
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

      {/* Layer 1: Enhanced Opening Greeting */}
      {currentLayer === 1 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center animate-fade-in-up">
            <div 
              className="w-96 h-80 mx-auto mb-8 rounded-lg shadow-2xl flex items-center justify-center p-8 animate-gentle-glow"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <div className="text-center">
                <div className="animate-float mb-4">
                  <Heart size={48} className="text-red-400 fill-current mx-auto" />
                </div>
                <h1 className="text-4xl font-serif mb-6 leading-relaxed animate-text-glow" style={{ color: '#8B4513' }}>
                  致我生命中的<br />
                  <span className="text-5xl font-bold">灯塔与靠山</span>
                </h1>
                <div className="w-24 h-1 mx-auto mb-6 animate-expand" style={{ backgroundColor: '#8B4513' }}></div>
                <p className="text-lg font-serif opacity-80" style={{ color: '#8B4513' }}>
                  父亲节快乐
                </p>
              </div>
            </div>
            <button
              onClick={nextLayer}
              className="px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 hover:scale-105 shadow-lg animate-gentle-bounce"
              style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
            >
              继续 →
            </button>
          </div>
        </div>
      )}

      {/* Layer 2: Enhanced Letter */}
      {currentLayer === 2 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-2xl w-full">
            <div 
              className="p-8 rounded-lg shadow-2xl min-h-96 animate-fade-in-scale"
              style={{ backgroundColor: '#D2B48C' }}
            >
              {/* Paper texture effect */}
              <div className="absolute inset-0 opacity-10 rounded-lg" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #8B4513 2px, #8B4513 4px)'
              }}></div>
              
              <div 
                className="font-serif text-lg leading-relaxed whitespace-pre-line relative z-10"
                style={{ color: '#8B4513' }}
              >
                {displayedText}
                <span className="animate-pulse text-2xl">|</span>
              </div>
              {isComplete && (
                <div className="text-center mt-8 animate-fade-in-up">
                  <button
                    onClick={nextLayer}
                    className="px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 hover:scale-105 shadow-lg animate-gentle-bounce"
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

      {/* Layer 3: Enhanced Photo Carousel */}
      {currentLayer === 3 && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-lg w-full">
            <div 
              className="p-6 rounded-lg shadow-2xl animate-fade-in-scale"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <h2 className="text-2xl font-serif text-center mb-6 animate-text-glow" style={{ color: '#8B4513' }}>
                珍贵回忆
              </h2>
              
              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={photos[photoIndex].url}
                    alt={photos[photoIndex].caption}
                    className="w-full h-64 object-cover transition-all duration-700 hover:scale-105"
                    style={{ filter: 'sepia(20%) saturate(1.2)' }}
                  />
                </div>
                
                {/* Photo frame effect */}
                <div className="absolute inset-0 border-4 border-white rounded-lg shadow-inner pointer-events-none"></div>
                
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-gentle-pulse"
                  style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-gentle-pulse"
                  style={{ backgroundColor: '#8B4513', color: '#F5F5DC' }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <p className="text-center mt-4 font-serif text-lg animate-fade-in" style={{ color: '#8B4513' }}>
                {photos[photoIndex].caption}
              </p>
              
              <div className="flex justify-center mt-4 space-x-2">
                {photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index === photoIndex ? 'opacity-100 scale-125' : 'opacity-40'
                    }`}
                    style={{ backgroundColor: '#8B4513' }}
                  />
                ))}
              </div>
              
              {photoIndex === photos.length - 1 && (
                <div className="text-center mt-6 animate-fade-in-up">
                  <button
                    onClick={nextLayer}
                    className="px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 hover:scale-105 shadow-lg animate-gentle-bounce"
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

      {/* Layer 4: Enhanced Final Blessing */}
      {currentLayer === 4 && (
        <div className="flex items-center justify-center min-h-screen p-4 relative">
          <div className="text-center animate-fade-in-scale z-10">
            <div 
              className="p-12 rounded-lg shadow-2xl max-w-lg mx-auto animate-gentle-glow"
              style={{ backgroundColor: '#D2B48C' }}
            >
              <div className="text-6xl mb-6 animate-float">🌟</div>
              <h1 className="text-4xl font-serif mb-6 leading-relaxed animate-text-glow" style={{ color: '#8B4513' }}>
                父亲节快乐！
              </h1>
              <p className="text-xl font-serif mb-8 leading-relaxed animate-fade-in-up" style={{ color: '#8B4513' }}>
                愿您永远健康、快乐！<br />
                愿我们的回忆永远温暖如春！<br />
                愿您的每一天都充满阳光！
              </p>
              <div className="text-4xl mb-6 animate-pulse">
                <Heart size={48} className="text-red-400 fill-current mx-auto" />
              </div>
            </div>
            
            <button
              onClick={restart}
              className="mt-8 px-6 py-2 rounded-full font-serif transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto animate-gentle-bounce"
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
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gentle-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 69, 19, 0.3); }
          50% { box-shadow: 0 0 30px rgba(139, 69, 19, 0.5); }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(139, 69, 19, 0.3); }
          50% { text-shadow: 0 0 20px rgba(139, 69, 19, 0.6); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 1s ease-out;
        }
        
        .animate-gentle-pulse {
          animation: gentle-pulse 2s ease-in-out infinite;
        }
        
        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gentle-glow {
          animation: gentle-glow 3s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 2s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out;
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