import { GitHub, Instagram, Linkedin } from "react-feather";
import { Box, Flex } from "@/components/Layouts";
import { Heading, Text } from "@/components/Texts";
import { getUserGithub } from "@/services/github";
import { getSiteConfig } from "@/utils/config";
import {
  ProfileContainerStyle,
  ProfileIconStyle,
  ProfileImageStyle,
  ProfileInnerStyle,
} from "./index.css";

async function Profile() {
  const { github, linkedin, instagram } = getSiteConfig("profile");
  const { profile } = await getUserGithub();

  return (
    <Box className={ProfileContainerStyle}>
      <Box className={ProfileInnerStyle}>
        <Flex
          flexDirection={{
            desktop: "column",
            tablet: "row",
            mobile: "row",
          }}
        >
          <Box
            className={ProfileImageStyle}
            style={{
              maxWidth: "200px",
              display: "inline-block",
            }}
            sprinkle={{
              borderRadius: "circle",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={profile.avatar_url}
              alt="profile"
            />
          </Box>
          <Box
            sprinkle={{
              marginTop: {
                desktop: "large",
                tablet: "none",
                mobile: "none",
              },
              marginLeft: {
                desktop: "none",
                tablet: "large",
                mobile: "large",
              },
            }}
          >
            <Heading size={"3x"}>{profile.name}</Heading>
            <Text>{profile.bio}</Text>
            <Box
              sprinkle={{
                marginTop: {
                  desktop: "xlarge",
                  tablet: "medium",
                  mobile: "medium",
                },
              }}
            >
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
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Profile;
