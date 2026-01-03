'use client';

import type {
  ConnectedImageMapStateToProps,
  ConnectedImageMapDispatchToProps,
  ConnectedImageProps,
} from './types';
// import { DeviceStateContext } from '@/contexts/DeviceContext';
import { connect, InferStateFromContext } from 'resurrection';
import { BaseImage } from '../../';

const ConnectedImage = connect<
  ConnectedImageMapStateToProps,
  ConnectedImageMapDispatchToProps,
  ConnectedImageProps
>({
  mapStateToPropsOptions: [
    {
      context: DeviceStateContext,
      mapStateToProps: (
        state: InferStateFromContext<typeof DeviceStateContext>,
        props: ConnectedImageProps
      ) => {
        let quality = props.quality;

        if (!quality) {
          if (state.isMobile) {
            quality = 50;
          } else if (state.isTablet) {
            quality = 75;
          } else if (state.isDesktop) {
            quality = 100;
          }
        }

        return {
          quality,
        };
      },
    },
  ],
})(BaseImage);

export default ConnectedImage;
