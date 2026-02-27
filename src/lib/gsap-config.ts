import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initGSAP() {
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)

        gsap.defaults({
            ease: 'power3.out',
            duration: 0.8
        })
    }
}
