import { ComposableComponent } from "../../../types";

export interface PortalProps extends ComposableComponent {
  id?: string;
  isOpen?: boolean;
  unmountDelay?: number;
}
