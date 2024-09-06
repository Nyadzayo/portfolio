import {JSX , SVGProps} from 'react';

export default function Footer() {
    const navigation = [
        {
            name:'github',
            href:'https://www.linkedin.com/in/kelvinnyadzayo/',
            icon:(props:JSX.IntrinsicAttributes& SVGProps<SVGAElement>) =>(
                <svg fill='currentColor' viewBox='0 0 24 24'>
                   
    
   
    <path d="M156,0h-120c-19.875,0 -36,16.125 -36,36v120c0,19.875 16.125,36 36,36h120c19.875,0 36,-16.125 36,-36v-120c0,-19.875 -16.125,-36 -36,-36zM59.36539,162.98077h-29.82693l-0.17307,-89.30769h29.82692zM43.70192,61.99038h-0.17308c-9.75,0 -16.03846,-6.72115 -16.03846,-15.08653c0,-8.56731 6.49039,-15.0577 16.41347,-15.0577c9.92308,0 16.00961,6.49038 16.21153,15.0577c0,8.36538 -6.31731,15.08653 -16.41346,15.08653zM162.77885,162.98077h-30.08654v-48.51923c0,-11.74039 -3.11538,-19.73077 -13.61538,-19.73077c-8.01923,0 -12.34615,5.39423 -14.42308,10.61538c-0.77885,1.875 -0.98077,4.44231 -0.98077,7.06731v50.56731h-30.23077l-0.17308,-89.30769h30.23077l0.17308,12.60577c3.86538,-5.97116 10.29808,-14.42308 25.70192,-14.42308c19.09616,0 33.37501,12.46154 33.37501,39.25961v51.86539z"></path>
   
    
                </svg>
            )
        }
    ]
  return (
   <footer className=" py-8">
    <div className="container max-w-3xl">
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
                {navigation.map(item =>(
                    <a 
                        key={item.name} 
                        href={item.href}
                        target='_blank'
                        rel='noreferrer noopener'
                        className='text-muted-foreground hover:text-foreground'
                        >
                            <span className="sr-only">{item.name}</span>
                            <item.icon aria-hidden='true' className='h-5 w-5'/>
                        </a>
                ))}
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-center text-xs leading-5 text-muted-foreground">
                    &copy: {new Date().getFullYear()} Kelvin Nyadzayo. All rights reserved.
                </p>
            </div>
        </div>
    </div>
   </footer>
  )
}
