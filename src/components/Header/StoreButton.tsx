import { Button, Link } from "@chakra-ui/react";
import { HiShoppingCart } from "react-icons/hi";

const StoreButton = () => {
  return (
    <Button
      as={Link}
      leftIcon={<HiShoppingCart />}
      variant="outline"
      href="/Pacotes"
      isExternal
      _hover={{
        textDecoration: "none",
      }}
    >
      Loja
    </Button>
  );
};

export default StoreButton;
