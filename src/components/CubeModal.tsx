"use client";
import Spline from "@splinetool/react-spline";

function CubeModal() {
  return (
    <div className="">
      <Spline
        className="scale-[.25] sm:scale-[.35] lg:scale-[.5] relative lg:top-[-150px] lg:right-[100px] top-[100px] right-[145px]"
        scene="https://prod.spline.design/prlIbGEF1iL6xcBp/scene.splinecode"
        style={{ width: "600px", height: "600px" }}
      />
    </div>
  );
}

export default CubeModal;
