import React, { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { TransparentCard } from './TransparentCard' // 引入新的 TransparentCard 模块

// 定义 Testimonials 的类型
interface Testimonial {
    name: string
    message: string
}

interface ColumnProps {
    testimonials: Testimonial[]
    speed: number
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

const testimonials: Testimonial[] = [
    { name: "头号粉丝", message: "Luatss 就是我的精神支柱，每次看他比赛都觉得自己还行！" },
    { name: "对手", message: "感谢 Luatss，还得假装骂我们，他的演技确实比枪法靠谱。" },
    { name: "队友", message: "白内障看不见, 暂时写不了留言。" },
    { name: "解说员", message: "每次解说 Luatss 的比赛，我都会思考：Luatss到底赢了吗？" },
    { name: "战队经理", message: "签下 Luatss 后，我掌握了团队冲突管理。" },
    { name: "Valve员工", message: "我们正在考虑基于 Luatss 设计一个新的'地图喷漆'。不过得等我们做完 Half-Life 3" },
    { name: "yezai_NZ", message: "Luatss 的存在证明了电竞不只是关于技术，更是关于娱乐。" },
    { name: "游戏开发者", message: "Luatss 的操作让我们重新思考了游戏平衡性。" },
    { name: "电竞教练", message: "Luatss 教会了我，有时候最好的策略就是没有策略。" },
]

const Column: React.FC<ColumnProps> = ({ testimonials, speed }) => {
    const columnRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const column = columnRef.current
        if (!column) return

        const animate = () => {
            if (column.scrollTop >= column.scrollHeight / 2) {
                column.scrollTop = 0
            } else {
                column.scrollTop += 1
            }
        }

        const intervalId = setInterval(animate, speed)

        return () => clearInterval(intervalId)
    }, [speed])

    return (
        <div
            ref={columnRef}
            className="flex flex-col gap-8 overflow-hidden h-full"
            style={{ scrollBehavior: 'smooth' }}
        >
            {testimonials.concat(testimonials).map((fan, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <TransparentCard containerRef={columnRef}> {/* 传递containerRef */}
                        <h3 className="text-xl font-bold mb-2 text-cyan-400">{fan.name}</h3>
                        <p className="italic mb-4 text-sm text-gray-200">{fan.message}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            ))}
                        </div>
                    </TransparentCard>
                </motion.div>
            ))}
        </div>
    )
}

export default function Component() {
    const containerRef = useRef<HTMLDivElement>(null); // 容器引用

    return (
        <section className="mb-20 py-16 overflow-hidden">
            <h2 className="text-5xl font-bold mb-12 text-center">
                <GlitchText text="Luatss 的粉丝留言" />
            </h2>
            <div
                ref={containerRef}
                className="relative h-[600px] mx-8 overflow-y-scroll no-scrollbar"
            >
                {/* 卡片滚动内容 */}
                <div className="absolute inset-0 flex justify-between space-x-8">
                    <Column testimonials={testimonials.slice(0, 3)} speed={50} />
                    <Column testimonials={testimonials.slice(3, 6)} speed={60} />
                    <Column testimonials={testimonials.slice(6, 9)} speed={70} />
                </div>
            </div>
        </section>
    );
}

