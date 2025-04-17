import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function render(ui: React.ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export * from '@testing-library/react';
export { render };