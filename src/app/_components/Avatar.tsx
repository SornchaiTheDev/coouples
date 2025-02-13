"use client";
import ReactNiceAvatar from "react-nice-avatar";
import { useCloset } from "@/providers/ClosetProvider";

interface Props {
  className?: string;
}

function Avatar({ className }: Props) {
  const { config } = useCloset();

  return <ReactNiceAvatar {...{ className, ...config }} />;
}

export default Avatar;
