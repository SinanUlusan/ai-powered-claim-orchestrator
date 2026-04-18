"use client";

import {
  Alert,
  Button,
  Description,
  Input,
  Label,
  Modal,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useClaimDashboard } from "@/hooks/use-claim-dashboard";
import { FETCH_CLAIM_FAILED } from "@/lib/api/get-claim";
import { formatExplainStep } from "@/lib/format-explain-step";
import { useClaimUiStore } from "@/store/claim-ui-store";
import { ActionAlert } from "./action-alert";
import { ClaimHeader } from "./claim-header";
import { Timeline } from "./timeline";

export function ClaimDashboard() {
  const t = useTranslations("dashboard");
  const tModals = useTranslations("modals");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const tExplain = useTranslations("explain");

  const { data, isPending, isError, error, dataUpdatedAt } =
    useClaimDashboard();

  const explainForStep = useClaimUiStore((s) => s.explainForStep);
  const closeExplain = useClaimUiStore((s) => s.closeExplain);
  const addNote = useClaimUiStore((s) => s.addNote);
  const addAttachment = useClaimUiStore((s) => s.addAttachment);

  const [noteTarget, setNoteTarget] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [attachmentTarget, setAttachmentTarget] = useState<number | null>(null);
  const [loadedMs, setLoadedMs] = useState(0);

  useEffect(() => {
    if (dataUpdatedAt == null) {
      queueMicrotask(() => setLoadedMs(0));
      return;
    }
    queueMicrotask(() => {
      setLoadedMs(Math.max(0, Date.now() - dataUpdatedAt));
    });
  }, [dataUpdatedAt]);

  const onAddNote = useCallback((afterStepIndex: number) => {
    setNoteDraft("");
    setNoteTarget(afterStepIndex);
  }, []);

  const onAddAttachment = useCallback((afterStepIndex: number) => {
    setAttachmentTarget(afterStepIndex);
  }, []);

  const submitNote = useCallback(() => {
    if (noteTarget === null) return;
    const trimmed = noteDraft.trim();
    if (!trimmed) return;
    addNote(noteTarget, trimmed);
    setNoteTarget(null);
    setNoteDraft("");
  }, [addNote, noteDraft, noteTarget]);

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-muted">{t("loading")}</p>
      </div>
    );
  }

  if (isError || !data) {
    const description =
      error instanceof Error && error.message === FETCH_CLAIM_FAILED
        ? tErrors("fetchFailed")
        : error instanceof Error
          ? error.message
          : t("errorUnknown");

    return (
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{t("errorTitle")}</Alert.Title>
          <Alert.Description>{description}</Alert.Description>
        </Alert.Content>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Alert>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{t("perfTitle")}</Alert.Title>
          <Alert.Description>
            {t("perfDescription", { ms: loadedMs })}
          </Alert.Description>
        </Alert.Content>
      </Alert>

      <ClaimHeader claim={data} />
      <ActionAlert claim={data} />
      <Timeline
        claim={data}
        onAddAttachment={onAddAttachment}
        onAddNote={onAddNote}
      />

      <Modal.Backdrop
        isOpen={explainForStep !== null}
        onOpenChange={(open) => {
          if (!open) closeExplain();
        }}
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{tModals("explainHeading")}</Modal.Heading>
              {explainForStep ? (
                <p className="text-sm text-muted">{explainForStep.title}</p>
              ) : null}
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm leading-relaxed text-pretty text-foreground">
                {explainForStep
                  ? formatExplainStep(explainForStep, (key, values) =>
                      tExplain(key, values),
                    )
                  : null}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close" variant="secondary">
                {tCommon("close")}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      <Modal.Backdrop
        isOpen={noteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setNoteTarget(null);
        }}
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{tModals("noteHeading")}</Modal.Heading>
              <p className="text-sm text-muted">{tModals("noteSub")}</p>
            </Modal.Header>
            <Modal.Body>
              <TextField className="w-full" name="note">
                <Label>{tModals("noteLabel")}</Label>
                <TextArea
                  placeholder={tModals("notePlaceholder")}
                  rows={4}
                  value={noteDraft}
                  className="mx-0.5"
                  onChange={(e) => setNoteDraft(e.target.value)}
                />
                <Description>{tModals("noteDescription")}</Description>
              </TextField>
            </Modal.Body>
            <Modal.Footer className="flex-col-reverse gap-2 sm:flex-row">
              <Button className="w-full" slot="close" variant="secondary">
                {tCommon("cancel")}
              </Button>
              <Button
                className="w-full"
                isDisabled={!noteDraft.trim()}
                onPress={submitNote}
              >
                {tModals("saveNote")}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      <Modal.Backdrop
        isOpen={attachmentTarget !== null}
        onOpenChange={(open) => {
          if (!open) setAttachmentTarget(null);
        }}
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{tModals("attachmentHeading")}</Modal.Heading>
              <p className="text-sm text-muted">{tModals("attachmentSub")}</p>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-2 m-1">
                <Label htmlFor="attachment-input">{tCommon("file")}</Label>
                <Input
                  fullWidth
                  id="attachment-input"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file || attachmentTarget === null) return;
                    addAttachment(attachmentTarget, file.name);
                    setAttachmentTarget(null);
                    e.target.value = "";
                  }}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close" variant="secondary">
                {tCommon("done")}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
}
