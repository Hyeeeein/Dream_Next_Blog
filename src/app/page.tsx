import CarouselPosts from "@/components/CarouselPosts";
import FeaturedPosts from "@/components/FeaturedPosts";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* 서버 컴포넌트에서 async 를 사용하는 건 괜찮은데 다른 컴포넌트에서 사용해서 가져오는 경우 에러가 나는데 13.2.1 버전에서는 구현이 되어 있지 않음 */}
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      {/* @ts-expect-error Server Component */}
      <CarouselPosts />
    </>
  );
}
