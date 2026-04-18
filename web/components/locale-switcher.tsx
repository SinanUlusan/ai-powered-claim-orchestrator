"use client";

import { Button, ButtonGroup } from "@heroui/react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ButtonGroup aria-label="Language" size="sm" variant="tertiary">
      <Button
        isDisabled={locale === "en"}
        onPress={() => router.replace(pathname, { locale: "en" })}
        variant={locale === "en" ? "primary" : "tertiary"}
      >
        EN
      </Button>
      <Button
        isDisabled={locale === "tr"}
        onPress={() => router.replace(pathname, { locale: "tr" })}
        variant={locale === "tr" ? "primary" : "tertiary"}
      >
        TR
      </Button>
    </ButtonGroup>
  );
}
