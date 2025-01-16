import eyecross from "@/assets/icons/eyecross.png";
import check from "@/assets/images/check.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import startBg from "@/assets/images/start-bg.png";
import email from "@/assets/icons/email.png";
import lock from "@/assets/icons/lock.png";
import bg_welcome from "@/assets/images/bg-welcome.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  startBg,
  check,
  bg_welcome,
};

export const icons = {
  eyecross,
  email,
  lock,
};

export const onboarding = [
  {
    id: 1,
    title: "Welcome to AgriSense",
    description:
      "Grow healthier pechay with real-time monitoring and smart farming tools.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Smarter Pechay Farming",
    description:
      "Optimize your pechay yield with automated insights and sustainable practices.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Maximize Your Pechay Growth",
    description:
      "Revolutionize pechay farming by streamlining every stage of growth.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};
