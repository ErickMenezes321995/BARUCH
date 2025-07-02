import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FiInstagram, FiTwitch } from "react-icons/fi";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const teams = [
  {
    name: "Team 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [
      {
        name: "name 1",
        position: "position 1",
        nickname: "nickname 1",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 2",
        position: "position 2",
        nickname: "nickname 2",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 3",
        position: "position 3",
        nickname: "nickname 3",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 4",
        position: "position 4",
        nickname: "nickname 4",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 5",
        position: "position 5",
        nickname: "nickname 5",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
    ],
  },
  {
    name: "Team 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [
      {
        name: "name 1",
        position: "position 1",
        nickname: "nickname 1",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 2",
        position: "position 2",
        nickname: "nickname 2",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 3",
        position: "position 3",
        nickname: "nickname 3",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 4",
        position: "position 4",
        nickname: "nickname 4",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
      {
        name: "name 5",
        position: "position 5",
        nickname: "nickname 5",
        social: {
          instagram: "instagram",
          twitch: "twitch",
        },
      },
    ],
  },
];

const Teams = () => {
  return (
    <SectionContainer title="Times">
      <Tabs variant="soft-rounded" w="100%">
        <TabList>
          {teams.map((team) => (
            <Tab
              border="1px solid"
              borderColor="grey.100"
              borderRadius="0.5em"
              backgroundColor="transparent"
              color="grey.600"
              margin="0 1em 0 0"
              _selected={{
                backgroundColor: "grey.100",
                color: "neutral.black",
                border: "2px solid",
                borderColor: "grey.200",
              }}
            >
              {team.name}
            </Tab>
          ))}
        </TabList>

        <Divider margin="1.5em 0" color="grey.200" />

        <TabPanels>
          {teams.map((team) => (
            <TabPanel
              as={Grid}
              templateColumns="repeat(auto-fill,minmax(20em, 1fr))"
              gap="1.5em"
            >
              {team.members.map((member) => (
                <Flex borderRadius="0.75em" overflow="hidden">
                  <Flex>
                    <Image
                      src="https://via.placeholder.com/118x164"
                      alt="member"
                    />
                  </Flex>
                  <Flex padding="1.5em" flexDirection="column">
                    <Box
                      bg="grey.100"
                      borderRadius="0.25em"
                      padding="0.25em 0.5em"
                      width="fit-content"
                    >
                      <Text color="grey.700" fontWeight="600">
                        {member.position}
                      </Text>
                    </Box>
                    <Heading
                      color="#00110F"
                      size="md"
                      margin="0.5em 0 0.25em 0"
                    >
                      {member.name}
                    </Heading>

                    <Text as="i" color="#AAAAAA" fontSize="13px">
                      {member.nickname}
                    </Text>

                    <Flex marginTop="0.5em">
                      <Link
                        href={member.social.twitch}
                        isExternal
                        color="brand.400"
                        margin="0 0.25em"
                        marginLeft="0"
                        padding="0.5em"
                        paddingLeft="0"
                      >
                        <FiTwitch size="1.5em" />
                      </Link>
                      <Link
                        href={member.social.instagram}
                        isExternal
                        color="brand.400"
                        margin="0 0.25em"
                        padding="0.5em"
                      >
                        <FiInstagram size="1.5em" />
                      </Link>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </SectionContainer>
  );
};

export default Teams;
