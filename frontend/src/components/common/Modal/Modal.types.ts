import type { ReactNode } from "react";

export interface ModalProps {
  readonly open: boolean;
  readonly title: string;
  readonly children: ReactNode;
  readonly onClose: () => void;
  readonly footer?: ReactNode;
}
