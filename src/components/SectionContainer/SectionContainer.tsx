import { Box, Flex, Heading } from "@chakra-ui/react";

const SectionContainer = ({ children, title, ...props }: any) => {
  return (
    <Box as="section">
      <Flex borderLeft="6px solid" borderColor="brand.600" pl="2em">
        <Heading size="lg" color="brand.900">
          {title}
        </Heading>
      </Flex>
      <Flex marginTop="2em" {...props}>
        {children}
      </Flex>
    </Box>
  );
};

export default SectionContainer;
