export const scrollToNextSection = (id = 'luatss-stats') => {
  const nextSection = document.getElementById(id);
  if (nextSection) {
    const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 增加滑动持续时间，毫秒
    let startTime: number | null = null;

    // 非线性缓动函数，加大非线性效果
    const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    // 动画函数
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);

      // 计算模糊程度，根据非线性缓动函数调整模糊效果
      const progress = timeElapsed / duration;
      const blurAmount = progress < 0.5 
        ? easeInOutCubic(timeElapsed, 0, 12, duration / 2)  // 前半段模糊增加
        : easeInOutCubic(timeElapsed - duration / 2, 12, -12, duration / 2);  // 后半段模糊减少
      
      document.body.style.filter = `blur(${blurAmount}px)`; // 设置模糊效果

      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // 强制固定在目标位置，防止跳回
        window.scrollTo(0, targetPosition);

        // 滚动结束后移除模糊效果，并强制固定位置
        setTimeout(() => {
          document.body.style.filter = 'none';
          window.scrollTo(0, targetPosition); // 再次确保锁定目标位置
        }, 0);
      }
    };

    // 启动动画
    requestAnimationFrame(animation);
  }
};
