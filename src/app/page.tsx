import Image from "next/image";
const img_url="https://www.shutterstock.com/image-vector/jts-letter-initial-logo-design-260nw-2090909833.jpg"
export default function Home() {
  return (
    <>
     <h2>hello</h2>
     <Image src={img_url} alt="image"  width={100} height={100}/>
    </>
  )
}
