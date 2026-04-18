const replace = jest.fn();

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/",
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";
import { LocaleSwitcher } from "./locale-switcher";

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    replace.mockClear();
  });

  it("requests locale change via router.replace", async () => {
    const user = userEvent.setup();
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <LocaleSwitcher />
      </NextIntlClientProvider>,
    );

    await user.click(screen.getByRole("button", { name: "TR" }));
    expect(replace).toHaveBeenCalledWith("/", { locale: "tr" });
  });
});
