import { GitHub, Instagram, Linkedin } from "react-feather";

import { ProfileIconStyle } from "./index.css";

import { Box } from "@/components/Layouts";
import { Heading, Text } from "@/components/Texts";
import { getUserGithub } from "@/services/github";
import { getSiteConfig } from "@/utils/config";

async function ProfilePage() {
  const { github, linkedin, instagram } = getSiteConfig("profile");
  const { profile } = await getUserGithub();

  return (
    <Box
      sprinkle={{
        width: "100%",
        maxWidth: "280px",
        textAlign: "center",
        paddingTop: {
          mobile: "large",
          tablet: "xlarge",
        },
      }}
    >
      <Box
        style={{
          display: "inline-block",
          width: "60%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
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
        />
      </Box>
      <Box sprinkle={{ marginTop: "medium" }}>
        <Heading size={"3x"}>{profile.name}</Heading>
        <Text>{profile.bio}</Text>
        <Box sprinkle={{ marginTop: "xlarge" }}>
          {linkedin && (
            <a
              className={ProfileIconStyle}
              href={`https://github.com/${github}`}
              target={"_blank"}
              rel={"noreferrer"}
            >
              <GitHub size={"20px"} color={"white"} />
            </a>
          )}
          {linkedin && (
            <a
              className={ProfileIconStyle}
              href={linkedin}
              target={"_blank"}
              rel={"noreferrer"}
            >
              <Linkedin size={"20px"} color={"white"} />
            </a>
          )}
          {instagram && (
            <a
              className={ProfileIconStyle}
              href={instagram}
              target={"_blank"}
              rel={"noreferrer"}
            >
              <Instagram size={"20px"} color={"white"} />
            </a>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
