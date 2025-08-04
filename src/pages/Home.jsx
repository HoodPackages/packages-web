import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import AnimationPack from '../components/AnimationPack'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnimationPack />
      <CategorySection />
    </>
  )
}
