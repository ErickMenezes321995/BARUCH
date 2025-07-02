import { Link } from "@chakra-ui/react";
import { FiInstagram, FiTwitch, FiTwitter } from "react-icons/fi";

const socialLinks = [
  {
    name: "Twitter",
    path: "#",
    icon: <FiTwitter size="1.5em" />,
  },
  {
    name: "Twitch",
    path: "#",
    icon: <FiTwitch size="1.5em" />,
  },
  {
    name: "Instagram",
    path: "#",
    icon: <FiInstagram size="1.5em" />,
  },
];

const SocialMedia = ({ iconColor }: any) => {
  const getIconColor = (color: string) => {
    switch (color) {
      case "green":
        return "brand.500";
      case "white":
        return "neutral.white";
      default:
        return "brand.500";
    }
  };

  return (
    <>
      {socialLinks.map((link) => (
        <Link
          href={link.path}
          isExternal
          key={link.name}
          color={getIconColor(iconColor)}
          margin="0 0.25em"
          padding="0.5em"
        >
          {link.icon}
        </Link>
      ))}
    </>
  );
};

export default SocialMedia;
