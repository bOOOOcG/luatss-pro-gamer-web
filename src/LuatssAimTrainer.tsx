import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './components/ui/Card';
import { Button } from './components/ui/Button';

const LuatssAimTrainer: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [misses, setMisses] = useState(0);
  const [highScore, setHighScore] = useState<number>(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const hitSoundRef = useRef<HTMLAudioElement>(null);
  const missSoundRef = useRef<HTMLAudioElement>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setMisses(0);
    setGameState('playing');
    moveTarget();
  };

  const endGame = () => {
    setGameState('ended');
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const moveTarget = () => {
    if (gameAreaRef.current) {
      const gameArea = gameAreaRef.current.getBoundingClientRect();
      const x = Math.random() * (gameArea.width - 50);
      const y = Math.random() * (gameArea.height - 50);
      setTargetPosition({ x, y });
    }
  };

  const hitTarget = () => {
    setScore(score + 1);
    hitSoundRef.current?.play();
    moveTarget();
  };

  const missTarget = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState === 'playing' && e.target === e.currentTarget) {
      setMisses(misses + 1);
      missSoundRef.current?.play();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const accuracy = score + misses > 0 ? ((score / (score + misses)) * 100).toFixed(2) : '0.00';

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-yellow-500">
      <CardContent className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-yellow-500">Luatss的瞄准训练器</h2>
        <div className="mb-4 flex justify-between items-center">
          <div className="text-xl">得分: {score}</div>
          <div className="text-xl">时间: {timeLeft}s</div>
          <div className="text-xl">命中率: {accuracy}%</div>
        </div>
        <div
          ref={gameAreaRef}
          className="w-full h-80 bg-gray-700 relative cursor-crosshair"
          onClick={missTarget}
        >
          {gameState === 'playing' && (
            <motion.div
              className="absolute w-12 h-12 bg-red-500 rounded-full"
              style={{ left: targetPosition.x, top: targetPosition.y }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              onClick={hitTarget}
            />
          )}
          {gameState === 'idle' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-2xl text-gray-400">点击开始按钮开始游戏</p>
            </motion.div>
          )}
          {gameState === 'ended' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center">
                <p className="text-3xl mb-2">游戏结束!</p>
                <p className="text-xl">你的得分: {score}</p>
                <p className="text-xl">命中率: {accuracy}%</p>
                <p className="text-lg mt-2 text-yellow-500">
                  {accuracy === '0.00'
                    ? "哇！你的表现简直就是Luatss本人！"
                    : parseFloat(accuracy) < 20
                    ? "恭喜！你已经达到了Luatss的水平！"
                    : parseFloat(accuracy) < 50
                    ? "还不错，但要成为Luatss还需要继续努力！"
                    : "太准了！你确定你是Luatss吗？"}
                </p>
                <p className="text-lg mt-2 text-yellow-500">最高得分: {highScore}</p>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={startGame}
            disabled={gameState === 'playing'}
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            {gameState === 'idle' ? '开始游戏' : '重新开始'}
          </Button>
        </div>
      </CardContent>
      <audio ref={hitSoundRef} src="/sounds/hit.mp3" />
      <audio ref={missSoundRef} src="/sounds/miss.mp3" />
    </Card>
  );
};

export default LuatssAimTrainer;
