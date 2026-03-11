import { Component,type ErrorInfo, type ReactNode } from "react";

import { ErrorFallback } from "../error-fallback";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  hasError: boolean;
  componentStack: string;
}

const INITIAL_STATE: State = {
  error: null,
  hasError: false,
  componentStack: "",
};

export class AppErrorBoundary extends Component<Props, State> {
  public override state: State = INITIAL_STATE;

  public static getDerivedStateFromError(error: Error): Pick<
    State,
    "error" | "hasError"
  > {
    return {
      error,
      hasError: true,
    };
  }

  public override componentDidCatch(_error: Error, errorInfo: ErrorInfo) {
    this.setState({ componentStack: errorInfo.componentStack ?? "" });

    // Integration point for Sentry or another monitoring service.
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          componentStack={this.state.componentStack}
        />
      );
    }

    return this.props.children;
  }
}
