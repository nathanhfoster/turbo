"use client";

import { AutoSizer, Size } from "react-virtualized";
import Box from "../../atoms/Box";
import type { AutoSizerProps } from "./types";

const AutoSizerComponent = ({
  children,
  className,
  _style,
  ...props
}: AutoSizerProps) => {
  return (
    <Box fullWidth fullHeight className={className}>
      <AutoSizer {...props}>
        {(size: Size) => (
          <Box fullWidth fullHeight>
            {children(size)}
          </Box>
        )}
      </AutoSizer>
    </Box>
  );
};

export default AutoSizerComponent;
