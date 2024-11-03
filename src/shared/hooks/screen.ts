import { useWindowSize } from 'react-use';

const breakpoint = {
  sm: 640,
  md: 768,
  lg: 1024,
  // xl: 1280,
};

export function useScreen() {
  const size = useWindowSize();

  const isSmall = size.width < breakpoint.sm;
  const isLarge = size.width >= breakpoint.lg;
  const isMedium = !(isLarge || isSmall);

  return { isSmall, isMedium, isLarge, isLandscape: size.width > size.height, size, breakpoint };
}
