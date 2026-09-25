import { useEffect, useRef, useState } from 'react'

interface DemoVideoProps {
  src: string
  poster: string
  /** 无障碍标签，描述这段演示的内容 */
  ariaLabel: string
  className?: string
}

/**
 * 静音循环演示视频：
 * - 滚到视口附近才加载 src，离开视口自动暂停
 * - 遵循 prefers-reduced-motion：不自动播放，给出控件让访客手动播放
 */
export function DemoVideo({ src, poster, ariaLabel, className }: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  /** 是否在视口附近（含 200px 预加载余量），持续变化，用于播放/暂停 */
  const [inView, setInView] = useState(false)
  /** 是否曾经进入过视口：视频只懒加载一次，滚回时继续播而不是重新下载 */
  const [hasEntered, setHasEntered] = useState(false)
  const [reduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // 两个观察器解耦：真实视口可见性管播放/暂停；提前 200px 只负责预加载一次
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const viewObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px' },
    )
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          preloadObserver.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )

    viewObserver.observe(el)
    preloadObserver.observe(el)
    return () => {
      viewObserver.disconnect()
      preloadObserver.disconnect()
    }
  }, [])

  // reduced-motion 下直接给 src（显示首帧、可手动播放）；否则首次接近视口才加载
  const shouldLoad = hasEntered || reduceMotion

  useEffect(() => {
    const el = videoRef.current
    if (!el || reduceMotion) return
    // React 的 muted 属性在部分浏览器不会落到 DOM，显式设一次保证可自动播放
    el.muted = true
    if (inView) {
      void el.play().catch(() => {
        /* 自动播放被拒时保持 poster，访客可点控件播放 */
      })
    } else {
      el.pause()
    }
  }, [inView, reduceMotion])

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      className={className}
      aria-label={ariaLabel}
      muted
      loop
      playsInline
      preload={reduceMotion ? 'metadata' : 'none'}
      controls={reduceMotion}
      tabIndex={reduceMotion ? 0 : -1}
    />
  )
}
