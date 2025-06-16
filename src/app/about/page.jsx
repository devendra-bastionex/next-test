import Image from "next/image";
import React from "react";
import bannerImage from "@/app/images/banner.jpg";
export default function AboutPage() {
  return (
    <main>
      <h1>About Page</h1>
      <div>
        <Image alt="banner image" width={400} height={200} src={bannerImage}/>
      </div>
      <div>
        <Image alt="Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)" width={400} height={200} src={`https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/1692947383286-714WUJlhbLS._SL1500_.jpg`}/>
      </div>
    </main>
  );
}

