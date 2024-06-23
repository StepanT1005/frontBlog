import React, { Component, ErrorInfo, ReactNode, createContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

const ErrorBoundaryContext = createContext<{
  navigate: NavigateFunction | null;
}>({ navigate: null });

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  static contextType = ErrorBoundaryContext;

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public componentDidUpdate(
    _: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ) {
    if (this.state.hasError && !prevState.hasError) {
      const { navigate } = this.context as { navigate: NavigateFunction };
      if (navigate) {
        navigate("/error");
      }
    }
  }

  public render() {
    return this.props.children;
  }
}

const ErrorBoundaryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundaryContext.Provider value={{ navigate }}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </ErrorBoundaryContext.Provider>
  );
};

export { ErrorBoundaryProvider as ErrorBoundary };
