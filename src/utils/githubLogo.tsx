import * as React from "react";

type GitHubLogoProps = React.SVGProps<SVGSVGElement> & {
  /** Pixel size for width/height (default 24) */
  size?: number;
  /** Fill color (default currentColor so it inherits text color) */
  color?: string;
  /** Accessible title (set undefined for decorative use) */
  title?: string;
  className?: string;
};

const GitHubLogo: React.FC<GitHubLogoProps> = ({
  size = 24,
  color = "currentColor",
  title = "GitHub",
  className,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    role={title ? "img" : undefined}
    aria-label={title || undefined}
    aria-hidden={title ? undefined : true}
    focusable="false"
    className={className}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path d="M12 .296a12 12 0 0 0-3.794 23.4c.6.113.82-.262.82-.582v-2.046c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.744.083-.729.083-.729 1.204.085 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.933 0-1.31.468-2.381 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 0 1 6 0c2.29-1.552 3.296-1.23 3.296-1.23.656 1.652.244 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.625-5.475 5.922.43.37.823 1.1.823 2.218v3.293c0 .323.218.699.825.58A12.004 12.004 0 0 0 12 .296z"/>
  </svg>
);

export default GitHubLogo;
