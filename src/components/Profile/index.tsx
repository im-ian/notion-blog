import Image from "next/image";
import { GitHub, Instagram, Linkedin } from "react-feather";

import { Box, Flex } from "@/components/Layouts";
import { Heading, Text } from "@/components/Texts";
import { getSiteConfig } from "@/utils/config";
import {
  HorizontalProfileContainerStyle,
  ProfileIconStyle,
  ResponsiveProfileContainerStyle,
  ResponsiveProfileImageStyle,
  ResponsiveProfileInnerStyle,
} from "./index.css";

function ProfileSnsIcons() {
  const { github, linkedin, instagram } = getSiteConfig("profile");

  return (
    <Flex gap={"small"}>
      {linkedin && (
        <a
          className={ProfileIconStyle}
          href={`https://github.com/${github}`}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <GitHub size={"20px"} style={{ color: "inherit" }} />
        </a>
      )}
      {linkedin && (
        <a
          className={ProfileIconStyle}
          href={linkedin}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <Linkedin size={"20px"} style={{ color: "inherit" }} />
        </a>
      )}
      {instagram && (
        <a
          className={ProfileIconStyle}
          href={instagram}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <Instagram size={"20px"} style={{ color: "inherit" }} />
        </a>
      )}
    </Flex>
  );
}

export async function ResponsiveProfile() {
  const { name, profileImage, bio } = getSiteConfig("profile");

  return (
    <Box className={ResponsiveProfileContainerStyle}>
      <Box className={ResponsiveProfileInnerStyle}>
        <Flex flexDirection={"column"} gap={"medium"}>
          {profileImage && (
            <Box
              className={ResponsiveProfileImageStyle}
              style={{
                maxWidth: "250px",
                display: "inline-block",
              }}
              sprinkle={{
                borderRadius: "circle",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                width={200}
                height={200}
                src={profileImage}
                alt={name}
              />
            </Box>
          )}
          <Flex flexDirection={"column"} gap={"small"}>
            <Heading size={"3x"}>{name}</Heading>
            <Text>{bio}</Text>
            <Box sprinkle={{ marginTop: "medium" }}>
              <ProfileSnsIcons />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export async function HorizontalProfile() {
  const { name, profileImage, bio } = getSiteConfig("profile");

  return (
    <Box className={HorizontalProfileContainerStyle}>
      <Flex gap={"large"}>
        {profileImage && (
          <Box
            className={ResponsiveProfileImageStyle}
            style={{
              maxWidth: "100px",
              display: "inline-block",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              width={100}
              height={100}
              src={profileImage}
              alt={name}
            />
          </Box>
        )}
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          gap={"xsmall"}
        >
          <Heading size={"2x"}>{name}</Heading>
          <Text size={"0.5x"}>{bio}</Text>
          <Box sprinkle={{ marginTop: "medium" }}>
            <ProfileSnsIcons />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
