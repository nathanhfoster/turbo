import type { ImageProps as NextImageProps } from "next/image";
import type { ConnectedComponentProps } from "resurrection";
import type { ImageProps } from "../../types";

export interface ConnectedImageMapStateToProps
  extends Pick<NextImageProps, "quality"> {}

export interface ConnectedImageMapDispatchToProps {}

export interface ConnectedImageProps extends ImageProps {}

export type ConnectedImageState = ConnectedComponentProps<
  ConnectedImageMapStateToProps,
  ConnectedImageMapDispatchToProps,
  ConnectedImageProps
>;
