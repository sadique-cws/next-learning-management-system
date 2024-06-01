import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import vikash from '../public/students/vikash.png';
import manas from '../public/students/manas.png';

const StudentData = [{
    name: "Vikash",
    image: vikash
},
{
    name: "Manas",
    image: manas
}]

const Achievements = () => {
    return (
        <Carousel className="w-full " opts={{
            align: "start",
            loop: true,
        }}>
            <CarouselContent className="-ml-4">
                {
                    StudentData.map((std, i) => (
                        <CarouselItem key={i} className="md:basis-1/4">
                            <Image src={std.image} alt={std.name} className="" />
                        </CarouselItem>
                    ))
                }



            </CarouselContent>
        </Carousel>

    )
}

export default Achievements