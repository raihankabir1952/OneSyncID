"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { fontSwitzer } from "@/lib/styles";

export default function WelcomePage() {
  const router = useRouter();

  const handleEnableNotifications = async () => {
    if ("Notification" in window) {
      await Notification.requestPermission();
    }
    router.push("/upload-file");
  };

  const handleSkip = () => {
    router.push("/upload-file");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[393px] bg-white min-h-screen flex flex-col">

        {/* Content */}
        <div className="flex-1 flex flex-col gap-[40px] pt-[30px] pb-10">

          {/* Illustration + Text */}
          <div className="flex flex-col gap-[20px] items-center px-5">
            <div className="flex flex-col gap-[20px] items-center w-full">

              {/* Illustration */}
              <div className="w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/welcome-illustration.png"
                  alt="Welcome to OneSyncID"
                  width={339}
                  height={222}
                  className="w-full h-auto"
                />
              </div>

              {/* Title */}
              <h1
                style={fontSwitzer}
                className="text-[20px] font-semibold text-black text-center w-full leading-normal"
              >
                Welcome to OneSyncID.
                <br />
                You&apos;re all set to go!
              </h1>
            </div>

            {/* Description */}
            <p
              style={fontSwitzer}
              className="text-[16px] text-[#333] w-full leading-normal"
            >
              Enable notifications to stay updated on your updates and alerts.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 px-5">
            <button
              onClick={handleEnableNotifications}
              style={fontSwitzer}
              className="w-full h-11 bg-[#025fc9] rounded-lg flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-white">
                Yes, Keep Me Updated
              </span>
            </button>

            <button
              onClick={handleSkip}
              style={fontSwitzer}
              className="w-full h-11 border-[1.5px] border-[#025fc9] rounded-lg flex items-center justify-center"
            >
              <span className="text-[16px] font-medium text-[#025fc9]">
                Skip for Now
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}