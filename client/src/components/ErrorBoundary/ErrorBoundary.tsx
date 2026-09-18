import React, { ReactNode, ErrorInfo } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('❌ Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-boundary">
            <div className="error-boundary-content">
              <h2>⚠️ Something went wrong</h2>
              <p className="error-message">{this.state.error?.message}</p>
              <div className="error-boundary-actions">
                <button 
                  className="error-boundary-retry" 
                  onClick={this.handleReset}
                  aria-label="Retry loading page"
                >
                  Try Again
                </button>
                <button 
                  className="error-boundary-home"
                  onClick={() => window.location.href = '/'}
                  aria-label="Go to home page"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
