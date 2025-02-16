import ClosetProvider from "@/providers/ClosetProvider";

function AvatarLayout({ children }: { children: React.ReactNode }) {
  return <ClosetProvider>{children}</ClosetProvider>;
}

export default AvatarLayout;
