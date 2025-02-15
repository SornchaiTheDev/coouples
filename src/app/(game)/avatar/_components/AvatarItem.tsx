import { AvatarConfigNoBoolean } from "@/configs/closet";
import { useCloset } from "@/providers/ClosetProvider";
import ReactNiceAvatar from "react-nice-avatar";

interface Props<T extends keyof AvatarConfigNoBoolean> {
  type: T;
  value: AvatarConfigNoBoolean[T];
}

function AvatarItem<T extends keyof AvatarConfigNoBoolean>({
  type,
  value,
}: Props<T>) {
  const { config } = useCloset();
  return (
    <ReactNiceAvatar
      className="w-16 h-16"
      {...{ ...config, [type]: value, bgColor: "transparent" }}
    />
  );
}

export default AvatarItem;
