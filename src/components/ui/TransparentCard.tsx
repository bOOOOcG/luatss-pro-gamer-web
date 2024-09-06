import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement>; // 传入容器引用
}

export const TransparentCard: React.FC<CardProps> = ({ children, className = '', containerRef }) => {
  const [opacity, setOpacity] = useState(1); // 初始化透明度为1（完全不透明）
  const cardRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const card = cardRef.current;
    const container = containerRef.current;
    
    if (card && container) {
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const fadeDistance = 150; // 调整距离以定义开始渐变的位置

      // 计算卡片距离容器顶部和底部的距离
      const distanceFromContainerTop = cardRect.top - containerRect.top;
      const distanceFromContainerBottom = containerRect.bottom - cardRect.bottom;

      // 根据距离顶部或底部的位置动态调整透明度
      const topFade = Math.min(Math.max(distanceFromContainerTop / fadeDistance, 0), 1);
      const bottomFade = Math.min(Math.max(distanceFromContainerBottom / fadeDistance, 0), 1);

      // 取最小的值作为最终透明度
      setOpacity(Math.min(topFade, bottomFade));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [containerRef]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className={`p-6 bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};
