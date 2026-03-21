// ToasterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertProps } from '@mui/material';


type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
  duration: number;
}

interface ToasterContextType {
  showToast: (message: string, severity?: ToastSeverity, duration?: number) => void;
}

interface ToasterProviderProps {
  children: ReactNode;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = (): ToasterContextType => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within ToasterProvider');
  }
  return context;
};


const initialToastState: ToastState = {
  open: false,
  message: '',
  severity: 'info',
  duration: 6000,
};

export const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>(initialToastState);

  const showToast = (
    message: string,
    severity: ToastSeverity = 'info',
    duration: number = 6000
  ): void => {
    setToast({
      open: true,
      message,
      severity,
      duration,
    });
  };

  const hideToast = (): void => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    hideToast();
  };

  // Маппинг severity для Alert
  const alertSeverityMap: Record<ToastSeverity, AlertProps['severity']> = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverityMap[toast.severity]}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToasterContext.Provider>
  );
};
