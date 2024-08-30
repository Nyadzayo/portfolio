import Image from 'next/image';
import authorImage from '@/public/images/authors/kevie.png';

export default function Intro() {
  return (
    <section className="flex flex-col md:flex-row items-start gap-x-10 gap-y-4 ">
        <div className="mt-2 flex-1 md:mt-0">
            <h1 className="title no-underline">Hey,I&#39;m Kelvin.</h1>
            <p className="mt-3 font-light text-muted-foreground">
                I&#39;m a software develop based in Zimbabwe. I&#39;m passionate about learning new tech and sharing knowledge with others.
            </p>
        </div>
        <div className="relative">
            <Image 
            className="flex-1 rounded-lg grayscale"
            src={authorImage}
            alt="Kelvin Nyadzayo"
            width={175}
            height={175}
            priority

            />
        </div>

    </section>
  )
}
