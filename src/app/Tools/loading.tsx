import Image from "next/image";

type Props = {
  type: "Loading" | "page";
};
function Loading({ type }: Props) {
  return (
    <div className="mt-3">
      {type === "Loading" && <div className="w-screen spinner "></div>}
      {type === "page" && (
        <div className="firstloading">
          <Image
            width={300}
            height={300}
            src="https://pulse.bboxx.com/v2/assets/animations/loader.gif"
            alt="Picture of the author"
          />
        </div>
      )}
    </div>
  );
}

export default Loading;
