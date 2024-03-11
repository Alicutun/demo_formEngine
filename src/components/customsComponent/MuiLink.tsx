import { Link } from "@mui/material";
import { define, oneOf, string, event } from "@react-form-builder/core";

export const muiLink = define(Link, "Muilink")
  .name("Link")
  .props({
    children: string.named("Text").default("Link"),
    underline: oneOf("none", "hover", "always"),
    href: string.named("Href").default(""),
    onClick: event,
  });
