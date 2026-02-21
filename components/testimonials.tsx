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
    {
        name: 'James Okonkwo',
        role: 'Founder, B2B Brand',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        quote: 'The motion ad creatives Matera Media produced outperformed everything we had before. Clear ROI, professional process, and a team that truly cares about our growth.',
    },
    {
        name: 'Nina Patel',
        role: 'Growth Lead',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        quote: 'Organic content that actually converts. Matera Media helped us build a content engine that feeds our funnel. Our webinar signups doubled within 90 days.',
    },
    {
        name: 'Ryan Mitchell',
        role: 'Director of Demand Gen',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        quote: 'Their ad creatives cut through the noise. We\'re in a competitive space and Matera Media\'s motion ads helped us stand out and capture attention. Worth every penny.',
    },
    {
        name: 'Sophie Laurent',
        role: 'Brand Manager',
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        quote: 'Professional, strategic, and incredibly creative. Matera Media helped us articulate our B2B story in a way that resonates. Our engagement metrics have never been higher.',
    },
    {
        name: 'Michael Torres',
        role: 'CEO, Creator Agency',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        quote: 'We partner with Matera Media for our top-tier clients. Their production quality and understanding of the creator economy make them our go-to for high-impact content.',
    },
    {
        name: 'Priya Sharma',
        role: 'Marketing Director',
        image: 'https://randomuser.me/api/portraits/women/6.jpg',
        quote: 'The strategy call alone was valuable. Matera Media doesn\'t just produce—they think. Our content mix is now aligned with our revenue goals. Highly recommend.',
    },
    {
        name: 'Daniel Kim',
        role: 'VP of Growth',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        quote: 'Best investment we made in our marketing stack. Matera Media\'s motion creatives and organic content strategy drove measurable pipeline growth. Exceptional work.',
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
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto font-light">{subtitle}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                    {testimonialChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className="space-y-4">
                            {chunk.map(({ name, role, quote, image }, index) => (
                                <Card
                                    key={index}
                                    className="bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
                                >
                                    <CardContent className="grid grid-cols-[auto_1fr] gap-4 pt-6 pb-6">
                                        <Avatar className="size-10 border-2 border-white/10">
                                            <AvatarImage
                                                alt={name}
                                                src={image}
                                                loading="lazy"
                                                width="120"
                                                height="120"
                                            />
                                            <AvatarFallback className="bg-white/10 text-white text-sm">
                                                {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h3 className="font-medium text-white font-instrument-sans">{name}</h3>
                                            <span className="text-white/50 block text-sm font-light">{role}</span>
                                            <blockquote className="mt-3">
                                                <p className="text-white/70 font-light text-sm leading-relaxed">{quote}</p>
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
