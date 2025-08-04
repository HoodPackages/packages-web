export default function AnimationPack() {
    const companyLogos = ["./CarouselPack/2.png", "./CarouselPack/3.png", "./CarouselPack/4.png", "./CarouselPack/5.png", "./CarouselPack/6.png", "./CarouselPack/2.png", "./CarouselPack/3.png",];

    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "15s" }}>
                    <div className="flex">
                        {[...companyLogos, ...companyLogos].map((company, index) => (
                            <img key={index} src={company}
                                alt={company} className="w-29 object-cover mx-6" draggable={false} />
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </>
    );
};