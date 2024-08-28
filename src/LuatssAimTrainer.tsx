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
  const [totalHits, setTotalHits] = useState(0);
  const [totalMisses, setTotalMisses] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [luatssScore, setLuatssScore] = useState(0); // Luatss 随机得分
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const hitSoundRef = useRef<HTMLAudioElement>(null);
  const missSoundRef = useRef<HTMLAudioElement>(null);

  // 评价列表
  const evaluations = [
    "上门安装假肢", "近亲繁殖", "下把晚点开", "菜鸟驿站", "ez", 
    "领养", "收徒", "墨镜上车", "素材局", "有真人吗", 
    "不接单", "代+", "投降在右上角", "蝼蚁", "叫你家大人来打", 
    "下课", "自己找差距", "统一回复:没开", "4399?", "未来是你们的", 
    "浪费我的网费", "开了吗?我说灵智", "来调灵敏度的", "不收后三名", 
    "白练一把", "原神代肝", "收坐骑", "征婚", "勤能补拙", 
    "失望", "聘7", "师承唐启华", "小段60大段150", "鼠标明天到用触摸板玩的", 
    "bot?", "很棒了已经", "这是幼教资格证考试项目吗", 
  ];

  // 随机选择评价
  const getRandomEvaluation = () => {
    const randomIndex1 = Math.floor(Math.random() * evaluations.length);
    let evaluation = `Luatss: ${evaluations[randomIndex1]}`;

    // 70% 几率拼接两条评价
    if (Math.random() < 0.7) {
      // 不能重复
      let randomIndex2 = Math.floor(Math.random() * evaluations.length);
      while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * evaluations.length);
      }
      evaluation += `, ${evaluations[randomIndex2]}`;
    }

    return evaluation;
  };

  // 随机生成 Luatss 得分
  const generateLuatssScore = () => {
    return Math.floor(Math.random() * 6) + 1; // 生成 1 到 6 之间的随机数
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setMisses(0);
    setGameState('playing');
    setLuatssScore(generateLuatssScore()); // 在游戏开始时生成 Luatss 得分
    moveTarget();
  };

  const endGame = () => {
    setGameState('ended');
    if (score > highScore) {
      setHighScore(score);
    }
    setTotalHits(totalHits + score);
    setTotalMisses(totalMisses + misses);
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

  useEffect(() => {
    if (hitSoundRef.current) {
      hitSoundRef.current.volume = volume;
    }
    if (missSoundRef.current) {
      missSoundRef.current.volume = volume;
    }
  }, [volume]);

  const accuracy = score + misses > 0 ? ((score / (score + misses)) * 100).toFixed(2) : '0.00';

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-yellow-500">
      <CardContent className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-yellow-500">Luatss的瞄准训练器</h2>
        <div className="mb-4 flex justify-between items-center">
          <div className="text-xl">得分: {score}</div>
          <div className="text-xl">时间: {timeLeft}s</div>
          <div className="text-xl">命中率: {accuracy}%</div>
          <div className="text-xl flex items-center">音量: 
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="ml-2 w-32 h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        <div
          ref={gameAreaRef}
          className="w-full h-80 bg-gray-700 relative cursor-crosshair"
          onClick={missTarget}
        >
          {gameState === 'playing' && (
            <motion.div
              className="absolute w-12 h-12 bg-blue-500 rounded-full"
              style={{ left: targetPosition.x, top: targetPosition.y, willChange: 'transform, opacity' }}
              animate={{ scale: [1, 1.3, 1], opacity: 1 }}
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
                <p className="text-xl">Luatss得分: {luatssScore}</p>
                <p className="text-lg mt-2 text-yellow-500">
                  {getRandomEvaluation()}
                </p>
                {highScore > 0 && (
                  <p className="text-lg mt-2 text-yellow-500">最高得分: {highScore}</p>
                )}
                {totalHits > 0 && (
                  <p className="text-lg mt-2 text-yellow-500">
                    平均命中率: {((totalHits / (totalHits + totalMisses)) * 100).toFixed(2)}%
                  </p>
                )}
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
