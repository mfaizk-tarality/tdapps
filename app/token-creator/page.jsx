import BreadCrumb from "@/common_component/BreadCrumb";
import CustomButton from "@/common_component/CustomButton";
import PageTitle from "@/common_component/PageTitle";
import {
  IconBoomFilled,
  IconCube,
  IconRouteSquare2,
} from "@tabler/icons-react";
import Link from "next/link";

const breadCrumb = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Token Creator",
    href: "/token-creator",
  },
];

const TokenCreator = () => {
  return (
    <div className="">
      <div className="w-full flex items-end justify-end">
        <BreadCrumb routes={breadCrumb} />
      </div>

      <div className="grid grid-cols-12">
        <div className="md:col-start-3 md:col-span-8 col-span-12 grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 mt-10">
            <PageTitle
              title={"Token Creator"}
              subtitle={
                "Deploy Custom Tokens with Flexible Options—From Standard Tokens to Minting, Burning, and Reflection Mechanics, All Without Writing a Single Line of Code."
              }
            />
          </div>
          {cardData?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="min-h-80 col-span-12 lg:col-span-4 border border-stroke flex items-center text-center justify-evenly flex-col rounded-2xl px-8"
              >
                <item.icon size={34} />
                <h4>{item.label}</h4>
                <p className="text-description">{item.desc}</p>
                <Link href={item.href}>
                  <CustomButton className={"rounded-md xl:min-w-52"}>
                    Create Token
                  </CustomButton>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TokenCreator;

const cardData = [
  {
    label: "Standard Token",
    desc: "Easily Deploy Your Own Standard Token on the Blockchain",
    icon: IconCube,
    href: "/token-creator/standard",
  },
  {
    label: "Minting & Burning Token",
    desc: "Control Circulating Supply by Minting Additional Tokens or Burning Unused Ones",
    icon: IconBoomFilled,
    href: "#",
  },
  {
    label: "Standard Reflaction Token",
    desc: "Easily Deploy Your Own Standard Reflection Token on the Blockchain",
    icon: IconRouteSquare2,
    href: "#",
  },
];
