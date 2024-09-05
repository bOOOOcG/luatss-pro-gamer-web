import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Trophy, Target, Crosshair, Skull, Clock, Users, Gamepad2, Bomb, Zap, Headphones, Coffee } from 'lucide-react'
import { FaSteam } from 'react-icons/fa'; // 引入 Bilibili 和 Steam 的图标
import { FaBilibili } from "react-icons/fa6";
import { FaVideo, FaDollarSign } from "react-icons/fa"; // 引入相关图标
import { TbBrandOnlyfans } from "react-icons/tb"; // 导入 OnlyFans 的图标
import { GiFishingHook } from "react-icons/gi";
import { FaGithub } from 'react-icons/fa';
import { GiFlashGrenade } from "react-icons/gi";

import LuatssAimTrainer from './LuatssAimTrainer';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/Avatar';
import { Button, AnimatedButton } from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';
import { LanguageButton } from './components/ui/LanguageButton';
import { scrollToNextSection } from './lib/scroll';

const AnimatedCounter = ({ value, duration = 6 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const controls = useAnimation()
  const inView = useInView(countRef)

  // 调整 easeOutCubic 函数，使动画更非线性
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 5);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      })
      let start = 0
      const end = typeof value === "string" ? parseFloat(value) : value;
      if (start === end) return

      // 增加 totalFrames 以减慢动画
      const totalFrames = duration * 60
      let frame = 0

      const timer = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        const easedProgress = easeOutCubic(progress)
        const currentValue = start + (end - start) * easedProgress
        setCount(parseFloat(currentValue.toFixed(2)))

        if (frame === totalFrames) {
          setCount(end)
          clearInterval(timer)
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [inView, value, duration, controls])

  return <span ref={countRef}>{count}</span>
}


const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ transform: 'translateX(-8px)' }}>{text}</span>
      <span className="absolute top-0 left-0 text-blue-500 opacity-70" style={{ transform: 'translateX(8px)' }}>{text}</span>
    </span>
  );
};

export default function Component() {
  const [isHovering, setIsHovering] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      scale: isHovering ? 1.1 : 1,
      rotate: isHovering ? [0, -5, 5, -5, 5, 0] : 0,
      transition: { duration: 0.5, type: 'spring' }
    })
  }, [isHovering, controls])

  const stats = [
    { icon: Trophy, label: 'KD比率', value: '0.41', description: '稳定如泰山，从不动摇' },
    { icon: Target, label: '命中率', value: '18.89', description: '虽不多见，但一击命中注定。' },
    { icon: Crosshair, label: '爆头率', value: '38.67', description: '"我架头线了啊"' },
    { icon: Skull, label: '场均击杀', value: '7.22', description: '质量重于数量' },
    { icon: Clock, label: '平均载入时间', value: '1145.14', description: '真正的高手都是最后出现的' },
    { icon: Users, label: '团队贡献度', value: '5.31', description: '负面榜样的力量' },
  ]

  const achievements = [
    '战绩表大面积红rating',
    '在1000场比赛中以倒数第一的身份保持嘲讽敌人',
    '单场比赛9杀20死仍然赢得了游戏',
    '成功被500+玩家举报作弊（实际上是队友很恼火 以及对面被嘲讽急眼）',
    '创造CSGO史上综合最低素质记录',
    '被Valve官方认证为"最具潜力的CS Brawlhalla部门选手"',
    '永远稳定的扔着白队友的闪光弹, 导致队友每次经过一个点位 只要有他在, 100%被白',
  ]

  const quotes = [
    { text: '"你看我不杀人都能赢, 谁才是高手不用我说了吧。"', author: 'Luatss 赛后采访' },
    { text: '"真的再单开把沙二我绝对有手感。"', author: 'Luatss 连续50场红rating后' },
    { text: '"勤能补拙, 笨鸟先飞。"', author: 'Luatss 对队友的评价' },
    { text: '"ez收徒, 叫你家大人来打。"', author: 'Luatss 对敌人的评价' },
    { text: '"我的枪法很准，只是我鼠标有点问题。"', author: 'Luatss 解释低命中率' },
    { text: '"……@#&*?!%^……反正那是你的问题, 我这个闪就是牛逼。"', author: 'Luatss 解释闪光弹争议' },
    { text: '"我在架啊。架了啊! 一直都在架啊! "', author: 'Luatss 面对"你怎么不架头线"问题' },
    { text: '"我是来改变游戏的，不是来玩游戏的。"', author: 'Luatss 谈及职业生涯' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-violet-900 text-white overflow-hidden">
      {/*<LanguageButton onClick={toggleLanguage} language={language} /> */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
        </div>
        <div className="relative z-10 text-center">
          <motion.div
            animate={controls}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative"
          >
            <Avatar className="w-64 h-64 mx-auto border-8 border-yellow-500 shadow-2xl rounded-full">
              <AvatarImage alt="Luatss" className="grayscale rounded-full" />
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-purple-500 opacity-50 rounded-full animate-pulse"></div>
            <div className="absolute -top-4 -right-4 bg-yellow-500 text-black rounded-full p-2 text-xs font-bold animate-bounce">
              ProMax
            </div>
          </motion.div>
          <motion.h1
            className="text-7xl font-extrabold mt-8 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <GlitchText text="Luatss" />
          </motion.h1>
          <motion.p
            className="text-3xl mb-8 text-yellow-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            CSGO界的"不世出"天才
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <AnimatedButton onClick={() => scrollToNextSection('luatss-stats')}>
              {'见证Luatss的"传奇"之路'}
            </AnimatedButton>
          </motion.div>
        </div>
      </header>

      <main id="luatss-stats" className="container mx-auto px-4 py-16">
        <main className="container mx-auto px-4 py-16">
          <section className="mb-20">
            <h2 className="text-5xl font-bold mb-12 text-center relative">
              <GlitchText text="Luatss 近期'辉煌'战绩" />
              <span className="text-sm align-super text-gray-400 ml-4 cursor-pointer relative group" style={{ top: '-0.5em' }}>
                (*)
                {/* Tooltip 内容 */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 bg-gray-800 text-white text-sm px-4 py-2 rounded shadow-lg" style={{ whiteSpace: 'nowrap', width: 'max-content' }}>
                  战绩统计基于抽取的2024年7月份的8把游戏 + S16赛季的第一把游戏
                </div>
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-800 border-yellow-500 overflow-hidden">
                  <CardContent className="p-6 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500"></div>
                    <stat.icon className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h3 className="text-2xl font-bold mb-2">{stat.label}</h3>
                    <p className="text-5xl font-bold text-yellow-500">
                      <AnimatedCounter value={parseFloat(stat.value)} />
                      {stat.label === '命中率' || stat.label === '爆头率' ? '%' : ''}
                      {stat.label === '平均生存时间' ? '秒' : ''}
                    </p>
                    <p className="mt-2 text-gray-400">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss 的'传奇'历程" />
          </h2>
          <Card className="border border-yellow-500"> {/* 添加金边 */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">关于Luatss</TabsTrigger>
                <TabsTrigger value="achievements">惊人成就</TabsTrigger>
                <TabsTrigger value="quotes">金句名言</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <CardContent className="p-6 text-gray-200">
                  <p className="mb-4 text-lg">
                    Luatss，是 Enou Club 中冉冉升起的一颗"闪亮之星"，他那传奇般的CS能力，彻底重塑了人们对“稳定”的定义。
                    他的游戏风格可以说是与众不同——每次进攻都如同一场对传统策略的大胆实验，而每次倒下则是对队友心理承受力的极限挑战。
                  </p>
                  <p className="mb-4 text-lg">
                    Luatss 的“闪光弹战术”已经成为一种经典。他总是能够以最快的速度找到敌人，然后用“精准无比”的闪光弹成功让队友瞬间失明。
                    每当队友被他“白”得看不见时，Luatss 总会振振有词地怪队友站位不对，完全无视他那神乎其技的“自家助攻”。队友们虽然无奈，但也不得不承认，只有 Luatss 能把闪光弹玩得如此出神入化，并且还能理直气壮地把锅甩出去。
                  </p>
                  <p className="mb-4 text-lg">
                    尽管他的技术水平常常让队友和对手瞠目结舌，Luatss 却始终保持着令人敬畏的自信。
                    他坚信自己是被数据误解的天才，这种坚韧不拔的精神，正是当今年轻人所需要的榜样。
                  </p>
                  <p className="text-lg">
                    Luatss 不仅仅是一名选手，更是一种现象。他用行动证明了在 CSGO 的竞技舞台上，
                    有时候“无知无畏”和“菜鸟的自信”才是通往胜利的真正秘诀。
                  </p>
                </CardContent>
              </TabsContent>
              <TabsContent value="achievements">
                <CardContent className="p-6 text-gray-200">
                  <ul className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center">
                        <Gamepad2 className="w-6 h-6 mr-2 text-yellow-500" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </TabsContent>
              <TabsContent value="quotes">
                <CardContent className="p-6 text-gray-200">
                  {quotes.map((quote, index) => (
                    <blockquote key={index} className="mb-4 last:mb-0">
                      <p className="text-lg italic mb-2">{quote.text}</p>
                      <footer className="text-sm text-gray-400">— {quote.author}</footer>
                    </blockquote>
                  ))}
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss 的'精彩'集锦" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">最佳死亡时刻</h3>
                <div className="aspect-video bg-gray-700 flex items-center justify-center relative overflow-hidden">
                  <Bomb className="w-20 h-20 text-red-500 animate-pulse" />
                  <p className="absolute text-lg font-bold">精彩集锦制作中...</p>
                  <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping"></div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">最佳'助攻'时刻</h3>
                <div className="aspect-video bg-gray-700 flex items-center justify-center relative overflow-hidden">
                  <Users className="w-20 h-20 text-blue-500 animate-pulse" />
                  <p className="absolute text-lg font-bold">精彩集锦制作中...</p>
                  <div className="absolute inset-0 bg-blue-500 opacity-20 animate-ping"></div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">最佳'战术'时刻</h3>
                <div className="aspect-video bg-gray-700 flex items-center justify-center relative overflow-hidden">
                  <Zap className="w-20 h-20 text-yellow-500 animate-pulse" />
                  <p className="absolute text-lg font-bold">精彩集锦制作中...</p>
                  <div className="absolute inset-0 bg-yellow-500 opacity-20 animate-ping"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss 的'独门'秘籍" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6 text-center">
                <GiFishingHook className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-2">胜利钩锁</h3>
                <p className="text-gray-300">
                  Luatss 的"胜利钩锁"：每一次挫败都在塑造我的强大，此局不续，汝自误也！（但实际上他下把的战绩是负的）
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6 text-center">
                <GiFlashGrenade className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-2">道具使用</h3>
                <p className="text-gray-300">
                  Luatss 的"闪光弹"：每次都能在关键时刻精准丢出一颗“完美”闪光弹，然后用无比自信的语气解释这颗闪光弹的重要性和高级性。至于队友被闪到——那肯定是队友没站好位置，完全不是道具的问题。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-2">团队激励</h3>
                <p className="text-gray-300">
                  Luatss 的"团队激励"：通过不断“善意”的指点和“*热情*”的沟通，成功让队友从低血压变成红温状态。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="教练评价" />
          </h2>
          <Card className="bg-gray-800 border-yellow-500">
            <CardContent className="p-8 text-gray-200">
              <blockquote className="text-xl italic">
                "在我20年的执教生涯中，我从未见过像Luatss这样的选手。他的表现总是出人意料，让我们的战术布置充满了'惊喜'。
                我们尝试了一切方法——从调整他的鼠标灵敏度到让他闭着眼睛玩（说实话，这反而提高了他的表现）。
                Luatss就像是CSGO界的一个未解之谜，他的存在挑战了我们对这个游戏的所有认知。
                也许有一天，当我们终于理解了Luatss的'天才'之处，整个CSGO的竞技格局都将为之改变。
                在此之前，我们只能继续欣赏他那令人瞠目结舌的表现，并期待他能在'坑队友'这项技能上更上一层楼。"
              </blockquote>
              <p className="mt-6 text-right text-yellow-500 font-bold text-lg">
                —— "我已经看到了CSGO的未来" Johnson 教练
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss 的粉丝留言" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "头号粉丝", message: "Luatss 就是我的精神支柱，每次看他比赛都觉得自己还行！" },
              { name: "对手", message: "感谢 Luatss，还得假装骂我们，他的演技确实比枪法靠谱。" },
              { name: "队友", message: "白内障看不见, 暂时写不了留言。" },
              { name: "解说员", message: "每次解说 Luatss 的比赛，我都会思考：Luatss到底赢了吗？" },
              { name: "战队经理", message: "签下 Luatss 后，我掌握了团队冲突管理。" },
              { name: "Valve员工", message: "我们正在考虑基于 Luatss 设计一个新的'地图喷漆'。不过得等我们做完 Half-Life 3" },
            ].map((fan, index) => (
              <Card key={index} className="bg-gray-800 border-yellow-500">
                <CardContent className="p-6 text-gray-200">
                  <h3 className="text-xl font-bold mb-2">{fan.name}</h3>
                  <p className="italic">"{fan.message}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss 的游戏设置" />
          </h2>
          <Card className="bg-gray-800 border-yellow-500">
            <CardContent className="p-6 text-gray-200">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="font-bold mr-2">鼠标灵敏度：</span>
                  <span>9999 (为了快速找到敌人)</span>
                </li>
                <li className="flex items-center">
                  <span className="font-bold mr-2">准星设置：</span>
                  <span>随机变化 (增加游戏的不确定性)</span>
                </li>
                <li className="flex items-center">
                  <span className="font-bold mr-2">声音设置：</span>
                  <span>静音 (减少干扰，专注于自己的节奏)</span>
                </li>
                <li className="flex items-center">
                  <span className="font-bold mr-2">视频设置：</span>
                  <span>最低画质 (增加挑战性)</span>
                </li>
                <li className="flex items-center">
                  <span className="font-bold mr-2">键位设置：</span>
                  <span>WASD键用来开枪，鼠标用来移动 (独创的操作方式)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      <section className="mb-20 px-4">
        <h2 className="text-5xl font-bold mb-12 text-center">
          <GlitchText text="和 Luatss 比瞄准能力" />
        </h2>
        <LuatssAimTrainer />
      </section>

      <section className="mb-20 px-4">
        <h2 className="text-5xl font-bold mb-12 text-center">
          <GlitchText text="关注 Luatss" />
        </h2>
        <div className="flex justify-center">
          <Card className="bg-gray-800 border-yellow-500 max-w-3xl w-full">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 justify-items-center">
                <a
                  href="https://space.bilibili.com/399112256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-yellow-500 text-white py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <FaBilibili className="w-8 h-8 mr-2" /> {/* Bilibili 图标 */}
                  <span>Bilibili</span>
                </a>
                <a
                  href="https://steamcommunity.com/profiles/76561198977550341/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-yellow-500 text-white py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <FaSteam className="w-8 h-8 mr-2" /> {/* Steam 图标 */}
                  <span>Steam</span>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" /* rick roll */
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-yellow-500 text-white py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <FaVideo className="w-8 h-8 mr-2" /> {/* 通用视频图标 */}
                  <span>Pornhub</span>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=BeyEGebJ1l4" /* 这不是rick roll */
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-yellow-500 text-white py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <TbBrandOnlyfans className="w-8 h-8 mr-2" /> {/* OnlyFans 图标 */}
                  <span>OnlyFans</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      <footer className="bg-gray-900 text-center py-8">
        <p className="text-lg">&copy; {new Date().getFullYear()} enou.org 所有权利保留。</p>
        <p className="mt-2 text-sm text-gray-500">
          网站声明：本网站纯属娱乐，如有雷同，纯属巧合。Luatss是我们的好朋友，请勿模仿他的游戏风格。
          我们不对因观看本网站内容而产生的任何心理阴影负责。
        </p>
        <div className="flex justify-center items-center mt-8">
          <a
            href="https://github.com/bOOOOcG/luatss-pro-gamer-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaGithub className="w-6 h-6 mr-2" />
            <span>此项目开源在 GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
