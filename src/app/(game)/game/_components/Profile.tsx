"use client";
import ReactNiceAvatar, { AvatarConfig } from "react-nice-avatar";

interface Props {
  config: AvatarConfig;
  className?: string;
}

function Profile({ config, className }: Props) {
  return <ReactNiceAvatar {...{ ...config, className }} />;
}

export default Profile;
