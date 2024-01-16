import CubeModal from "./CubeModal";

async function Hero() {
  return (
    <main className="flex flex-col justify-between lg:px-36 lg:mt-20">
      <section className="flex flex-col lg:flex-row justify-between">
        <div className="flex items-start flex-col justify-end">
          <h1 className="text-6xl font-bold">Empowering Healthcare</h1>
          <p>Innovative Medical Records Management for a Healthier Tomorrow</p>
        </div>
        <div>
          <CubeModal />
        </div>
      </section>
    </main>
  );
}

export default Hero;
