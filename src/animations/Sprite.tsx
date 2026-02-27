import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Sprite = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".box", { x: 100, y: 1000 });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div className="box bg-amber-300 w-5 h-5">Hatdog</div>
    </div>
  );
};

export default Sprite;
