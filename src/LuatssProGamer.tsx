import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/Avatar';
import { Button } from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';
import { Trophy, Target, Crosshair, Skull, Clock, Users, Gamepad2, Bomb, Zap, Headphones, Coffee } from 'lucide-react'

// In your main component file
import LuatssAimTrainer from './LuatssAimTrainer';

const AnimatedCounter = ({ value, duration = 4 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const controls = useAnimation()
  const inView = useInView(countRef)

  // easeOutCubic function for non-linear easing
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      })
      let start = 0
      const end = typeof value === "string" ? parseFloat(value) : value;
      if (start === end) return

      const totalFrames = duration * 120 // Increase total frames for slower animation (120 fps-based)
      let frame = 0

      const timer = setInterval(() => {
        frame++
        const progress = frame / totalFrames // Progress from 0 to 1
        const easedProgress = easeOutCubic(progress) // Apply easing function
        const currentValue = start + (end - start) * easedProgress
        setCount(parseFloat(currentValue.toFixed(2))) // Update count with two decimal places

        if (frame === totalFrames) {
          setCount(end) // Ensure final value is exact
          clearInterval(timer)
        }
      }, 1000 / 120) // Run at slower speed (120 frames over the duration)

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
    { icon: Clock, label: '平均载入时间', value: '1145.14', description: '最强的高手都是最后出现的' },
    { icon: Users, label: '团队贡献度', value: '5.31', description: '负面榜样的力量' },
  ]

  const achievements = [
    '战绩表大面积红rating',
    '在1000场比赛中以倒数第一的身份保持嘲讽敌人',
    '单场比赛9杀20死仍然赢得了游戏',
    '成功被500+玩家举报作弊（开挂）',
    '创造CSGO史上综合最低素质记录',
    '被Valve官方认证为"最具潜力退役选手"',
  ]

  const quotes = [
    { text: '"你看我不杀人都能赢。"', author: 'Luatss 赛后采访' },
    { text: '"真的再单开把沙二我绝对有手感。"', author: 'Luatss 连续50场红rating后' },
    { text: '"勤能补拙, 笨鸟先飞。"', author: 'Luatss 对队友的评价' },
    { text: '"ez收徒, 叫你家大人来打。"', author: 'Luatss 对敌人的评价' },
    { text: '"我的枪法很准，只是我鼠标有点问题。"', author: 'Luatss 解释低命中率' },
    { text: '"我是来改变游戏的，不是来玩游戏的。"', author: 'Luatss 谈及职业生涯' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white overflow-hidden">
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
            <Avatar className="w-64 h-64 mx-auto border-8 border-yellow-500 shadow-2xl rounded-full"> {/* 添加 rounded-full */}
              <AvatarImage alt="Luatss" className="grayscale rounded-full" /> {/* 添加 rounded-full */}
              <AvatarFallback></AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-purple-500 opacity-50 rounded-full animate-pulse"></div> {/* 确保该 div 也有 rounded-full */}
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
            <Button variant="outline" size="lg" className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-300">
              见证Luatss的"传奇"之路
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss 近期'辉煌'战绩" />
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

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss的'传奇'历程" />
          </h2>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">关于Luatss</TabsTrigger>
              <TabsTrigger value="achievements">惊人成就</TabsTrigger>
              <TabsTrigger value="quotes">金句名言</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <Card>
                <CardContent className="p-6 text-gray-200">
                  <p className="mb-4 text-lg">
                    Luatss，Enou Club"人才库"中的璀璨明珠，用他那令人叹为观止的0.2 KD比率彻底重新定义了CSGO中"一致性"的含义。
                    他的游戏风格可以用"独树一帜"来形容——每一次出击都是对常规战术的挑战，每一次死亡都是对队友心理承受能力的考验。
                  </p>
                  <p className="mb-4 text-lg">
                    Luatss最为人称道的能力是他那堪称艺术的"战术送人头"。他总能以最快的速度找到敌人，然后以最快的速度返回出生点。
                    这种高效率的游戏方式让队友们常常怀疑他是否在暗中为敌队效力，但Luatss坚持认为这是一种"高级战术"。
                  </p>
                  <p className="mb-4 text-lg">
                    尽管技术水平常常让队友和对手alike目瞪口呆，Luatss却保持着一种令人敬畏的自信。
                    他坚信自己是被错误统计数据低估的天才，而这种不屈不挠的精神正是当代年轻人所需要的。
                  </p>
                  <p className="text-lg">
                    Luatss不仅是一名选手，更是一种现象——他证明了在CSGO这个竞技舞台上，
                    有时候"不知者无畏"和"越菜越爱玩"这样的品质，才是真正的制胜法宝。
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements">
              <Card>
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
              </Card>
            </TabsContent>
            <TabsContent value="quotes">
              <Card>
                <CardContent className="p-6 text-gray-200">
                  {quotes.map((quote, index) => (
                    <blockquote key={index} className="mb-4 last:mb-0">
                      <p className="text-lg italic mb-2">{quote.text}</p>
                      <footer className="text-sm text-gray-400">— {quote.author}</footer>
                    </blockquote>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss的'精彩'集锦" />
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
            <GlitchText text="Luatss的'独门'秘籍" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6 text-center">
                <Headphones className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-2">听声辨位</h3>
                <p className="text-gray-300">
                  Luatss独创的"听声辨位"技术：无论敌人在哪，他总能第一时间找到并送上人头。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6 text-center">
                <Coffee className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-2">养生打法</h3>
                <p className="text-gray-300">
                  Luatss的"养生打法"：每局比赛保证充足的休息时间，绝不过度劳累。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-yellow-500">
              <CardContent className="p-6 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-2">团队激励</h3>
                <p className="text-gray-300">
                  Luatss的"团队激励"：通过自身表现，激发队友的求生欲和胜利欲望。
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
            <GlitchText text="Luatss的粉丝留言" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "头号粉丝", message: "Luatss就是我的人生导师！" },
              { name: "对手", message: "求求你来我们队吧，保证不打你！" },
              { name: "队友", message: "谢谢你，让我知道了什么是真正的绝望。" },
              { name: "解说员", message: "每次解说Luatss的比赛，我都不知道该说什么好。" },
              { name: "战队经理", message: "签下Luatss是我职业生涯中最'明智'的决定。" },
              { name: "Valve员工", message: "我们正在考虑为Luatss设计一个专属的'成就'。" },
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
            <GlitchText text="Luatss的瞄准训练器" />
          </h2>
          <LuatssAimTrainer />
        </section>

        <section className="mb-20">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <GlitchText text="Luatss的游戏设置" />
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

      <footer className="bg-gray-900 text-center py-8">
        <p className="text-lg">&copy; 2023 Enou Club. 所有权利保留。</p>
        <p className="mt-2 text-sm text-gray-500">
          网站声明：本网站纯属娱乐，如有雷同，纯属巧合。Luatss是我们的好朋友，请勿模仿他的游戏风格。
          我们不对因观看本网站内容而产生的任何心理阴影负责。
        </p>
      </footer>
    </div>
  )
}