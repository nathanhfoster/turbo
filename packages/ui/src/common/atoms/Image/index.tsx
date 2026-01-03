import { combineClassNames } from '@nathanhfoster/utils';
import NextImage from 'next/image';
import type { ImageProps } from './types';

const Image: React.FC<ImageProps> = ({
  className,
  responsive = false,
  fullHeight,
  fullWidth = responsive,
  quality = 100,
  belowTheFold = false,
  priority = !belowTheFold,
  loading = belowTheFold ? 'lazy' : priority ? 'eager' : undefined,
  size,
  width = size,
  height = size,
  fill = responsive || (!width && !height),
  src,
  alt,
  ...props
}) => {
  const wrapperClass = combineClassNames(
    className,
    fullWidth && 'w-full',
    fullHeight && 'h-full',
    responsive && 'aspect-[16/9]',
    responsive && 'relative'
  );

  const imageClass = combineClassNames(responsive && 'object-cover');

  return (
    <div className={wrapperClass}>
      <NextImage
        src={src}
        alt={alt}
        quality={quality}
        priority={priority}
        loading={loading}
        width={width}
        height={height}
        fill={fill}
        className={imageClass}
        {...props}
      />
    </div>
  );
};

export default Image;
