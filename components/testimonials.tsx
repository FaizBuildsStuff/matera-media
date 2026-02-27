"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Sarah Chen',
        role: 'VP Marketing, B2B SaaS',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        quote: 'Matera Media transformed our ad creative. Our motion ads drove 3x higher CTR and we saw real revenue impact in the first quarter. Their strategic approach to B2B content is unmatched.',
    },
    {
        name: 'Marcus Webb',
        role: 'Head of Brand, Tech Startup',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        quote: 'From concept to launch, the team understood our vision. The organic content strategy they built helped us grow our audience by 40% in six months. Highly recommend.',
    },
    {
        name: 'Elena Rodriguez',
        role: 'Creator & YouTuber',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        quote: 'Matera Media helped me level up my YouTube presence. Their production quality and understanding of what converts made all the difference. My channel has never looked better.',
    },
    {
        name: 'David Park',
        role: 'CMO, Enterprise',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        quote: 'We\'ve worked with many agencies. Matera Media stands out for their motion ad creatives—they convert. Our CAC dropped 25% after we switched to their ad formats.',
    },
    {
        name: 'Alexandra Foster',
        role: 'Content Director',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        quote: 'Finally, a partner who gets both creativity and performance. Their organic content doesn\'t just look good—it drives actual pipeline and revenue. Game-changer for our brand.',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

type TestimonialsContent = {
    title?: string;
    subtitle?: string;
};

export default function WallOfLoveSection({ content }: { content?: TestimonialsContent }) {
    const title = content?.title ?? "Trusted by Brands & Creators";
    const subtitle = content?.subtitle ?? "See why B2B brands and creators partner with us to grow with organic content and high-performance ad creatives.";

    return (
        <section className="py-32 px-6 bg-[#05180D] relative overflow-hidden">
            {/* --- IMAGE TEXTURE & GRADIENT OVERLAYS --- */}
            
            {/* 1. Grainy Texture Overlay (Matching the uploaded image texture) */}
            <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.60' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
            
            {/* 2. Main Emerald Light Beam (Matches the image's lighting) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial from-[#157F53]/20 via-transparent to-transparent blur-[120px] pointer-events-none"></div>

            {/* 3. Section Merge Gradients (Ensures seamless flow with up/down green sections) */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-[#05180D] to-transparent z-1"></div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#05180D] to-transparent z-1"></div>

            <div className="mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-4 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-white/50 max-w-xl mx-auto font-light leading-relaxed">{subtitle}</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                    {testimonialChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className="space-y-6">
                            {chunk.map(({ name, role, quote, image }, index) => (
                                <Card
                                    key={index}
                                    className="bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-emerald-500/20 hover:bg-white/[0.05] transition-all duration-500"
                                >
                                    <CardContent className="grid grid-cols-[auto_1fr] gap-4 pt-6 pb-6">
                                        <Avatar className="size-10 border border-white/10">
                                            <AvatarImage
                                                alt={name}
                                                src={image}
                                                loading="lazy"
                                                width="120"
                                                height="120"
                                            />
                                            <AvatarFallback className="bg-white/10 text-white text-xs">
                                                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h3 className="font-medium text-white/90 text-sm font-instrument-sans">{name}</h3>
                                            <span className="text-white/40 block text-xs font-light">{role}</span>
                                            <blockquote className="mt-3">
                                                <p className="text-white/60 font-light text-sm leading-relaxed italic">
                                                    "{quote}"
                                                </p>
                                            </blockquote>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}