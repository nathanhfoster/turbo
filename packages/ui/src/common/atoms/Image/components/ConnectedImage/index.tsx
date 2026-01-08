"use client";

import type {
  ConnectedImageMapStateToProps,
  ConnectedImageMapDispatchToProps,
  ConnectedImageProps,
} from "./types";
// TODO: Re-enable when DeviceStateContext is available
// import { DeviceStateContext } from '@nathanhfoster/pwa/device';
import { connect } from "@nathanhfoster/resurrection";
import Image from "../../";

// Temporarily disabled - requires DeviceStateContext
// const ConnectedImage = connect<
//   ConnectedImageMapStateToProps,
//   ConnectedImageMapDispatchToProps,
//   ConnectedImageProps
// >({
//   mapStateToPropsOptions: [
//     {
//       context: DeviceStateContext,
//       mapStateToProps: (
//         state: InferStateFromContext<typeof DeviceStateContext>,
//         props: ConnectedImageProps,
//       ) => {
//         let quality = props.quality;

//         if (!quality) {
//           if (state.isMobile) {
//             quality = 50;
//           } else if (state.isTablet) {
//             quality = 75;
//           } else if (state.isDesktop) {
//             quality = 100;
//           }
//         }

//         return {
//           quality,
//         };
//       },
//     },
//   ],
// })(Image);

// Export regular Image until ConnectedImage is properly configured
const ConnectedImage = Image;

export default ConnectedImage;
