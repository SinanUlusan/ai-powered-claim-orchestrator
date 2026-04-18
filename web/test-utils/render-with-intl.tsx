import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactElement, ReactNode } from "react";
import en from "@/messages/en.json";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

export function renderWithIntl(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { locale?: string },
) {
  const queryClient = createTestQueryClient();
  const locale = options?.locale ?? "en";

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={en}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextIntlClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
