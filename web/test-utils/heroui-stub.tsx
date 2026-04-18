/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export function Button({
  children,
  onPress,
  isDisabled,
  isPending,
  ...rest
}: any) {
  return (
    <button
      type="button"
      disabled={Boolean(isDisabled || isPending)}
      onClick={onPress}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonGroup({ children, ...rest }: any) {
  return (
    <div role="group" {...rest}>
      {children}
    </div>
  );
}

function CardRoot({ children, ...rest }: any) {
  return <section {...rest}>{children}</section>;
}

CardRoot.Header = ({ children, ...rest }: any) => (
  <header {...rest}>{children}</header>
);
CardRoot.Title = ({ children, ...rest }: any) => <h3 {...rest}>{children}</h3>;
CardRoot.Description = ({ children, ...rest }: any) => (
  <p {...rest}>{children}</p>
);
CardRoot.Content = ({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);
CardRoot.Footer = ({ children, ...rest }: any) => (
  <footer {...rest}>{children}</footer>
);

export const Card = CardRoot;

export function Chip({ children, ...rest }: any) {
  return <span {...rest}>{children}</span>;
}

function AlertRoot({ children, ...rest }: any) {
  return (
    <div role="alert" {...rest}>
      {children}
    </div>
  );
}
AlertRoot.Indicator = ({ children, ...rest }: any) => (
  <span {...rest}>{children}</span>
);
AlertRoot.Content = ({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);
AlertRoot.Title = ({ children, ...rest }: any) => (
  <strong {...rest}>{children}</strong>
);
AlertRoot.Description = ({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);

export const Alert = AlertRoot;

export function Spinner(props: any) {
  return <span data-testid="spinner" {...props} />;
}

export function Label({ children, htmlFor, ...rest }: any) {
  return (
    <label htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  );
}

export function Description({ children, ...rest }: any) {
  return <small {...rest}>{children}</small>;
}

export function Input({ onChange, ...rest }: any) {
  return <input onChange={onChange} {...rest} />;
}

export function TextArea({ onChange, ...rest }: any) {
  return <textarea onChange={onChange} {...rest} />;
}

export function TextField({ children, ...rest }: any) {
  return <div {...rest}>{children}</div>;
}

function ModalBackdrop({ children, isOpen, onOpenChange, ...rest }: any) {
  if (!isOpen) return null;
  return (
    <div
      data-testid="modal-backdrop"
      {...rest}
      onKeyDown={(e) => {
        if (e.key === "Escape") onOpenChange?.(false);
      }}
    >
      {children}
    </div>
  );
}

function ModalCloseTrigger() {
  return null;
}

function ModalHeading({ children, ...rest }: any) {
  return <h2 {...rest}>{children}</h2>;
}

const ModalRoot = {
  Backdrop: ModalBackdrop,
  Container: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  Dialog: ({ children, ...rest }: any) => (
    <div role="dialog" {...rest}>
      {children}
    </div>
  ),
  CloseTrigger: ModalCloseTrigger,
  Header: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  Heading: ModalHeading,
  Body: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
  Footer: ({ children, ...rest }: any) => <div {...rest}>{children}</div>,
};

export const Modal = ModalRoot;

export function Tooltip({ children }: any) {
  return <div>{children}</div>;
}

Tooltip.Content = ({ children, ...rest }: any) => (
  <div {...rest}>{children}</div>
);

export function Separator(props: any) {
  return <hr {...props} />;
}
