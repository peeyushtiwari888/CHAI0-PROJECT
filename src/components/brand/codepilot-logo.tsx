import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Props for {@link CodePilotLogo}.
 *
 * @property className - Extra classes applied to the wrapper.
 * @property showWordmark - Deprecated: logo.png includes the full logo branding.
 */
type CodePilotLogoProps = {
  className?: string;
  showWordmark?: boolean;
};

/**
 * The standalone CodePilot image mark.
 *
 * @param className - Extra classes applied to the `<Image>` element.
 */
function CodePilotMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="CodePilot"
      width={120}
      height={32}
      className={cn("h-9 w-auto object-contain dark:invert-0 invert", className)}
      priority
    />
  );
}

/**
 * The CodePilot brand logo.
 *
 * @param props - See {@link CodePilotLogoProps}.
 */
export function CodePilotLogo({
  className,
}: CodePilotLogoProps) {
  return (
    <span className={cn("inline-flex items-center text-foreground", className)}>
      <CodePilotMark />
    </span>
  );
}

export { CodePilotMark };
