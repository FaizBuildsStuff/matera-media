'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 flex justify-center items-center py-8 px-4 pointer-events-none">
            <div className="pointer-events-auto">
                <Link href="/" className="block relative hover:scale-[1.02] transition-transform duration-300">
                    <Image
                        src="/Banner.png"
                        alt="Matera Media"
                        width={400}
                        height={120}
                        className="w-auto h-20 md:h-28 object-contain drop-shadow-2xl"
                        priority
                    />
                </Link>
            </div>
        </header>
    );
};
