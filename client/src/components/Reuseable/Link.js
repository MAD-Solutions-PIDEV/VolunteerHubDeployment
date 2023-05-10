import React from "react";
import { Link as ReactLink } from "react-router-dom";

/**
 * @param {{children?:React.ReactNode}&React.HTMLAttributes<HTMLAnchorElement>&import("next/link").LinkProps} props
 */

const Link = ({
  children,
  href,
  replace,
  scroll,
  shallow,
  prefetch,
  locale,
  as,
  ...props
}) => {
  const linkProps = {
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    as,
  };
  return (
    <a href={href} {...linkProps} {...props}>
      {children}
    </a>
  );
};

export default Link;
