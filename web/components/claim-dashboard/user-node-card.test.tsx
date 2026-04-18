import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/test-utils/render-with-intl";
import { useClaimUiStore } from "@/store/claim-ui-store";
import { UserNodeCard } from "./user-node-card";

function AttachmentFromStore() {
  const node = useClaimUiStore((s) => s.userNodes[0]);
  if (!node || node.type !== "attachment") return null;
  return <UserNodeCard node={node} />;
}

describe("UserNodeCard", () => {
  beforeEach(() => {
    useClaimUiStore.setState({ userNodes: [], explainForStep: null });
  });

  it("renders note and allows remove", async () => {
    const user = userEvent.setup();
    useClaimUiStore.setState({
      userNodes: [{ id: "n1", type: "note", afterStepIndex: 0, body: "hello" }],
    });
    renderWithIntl(<UserNodeCard node={{ id: "n1", type: "note", afterStepIndex: 0, body: "hello" }} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(useClaimUiStore.getState().userNodes).toHaveLength(0);
  });

  it("updates attachment analysis via store", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    useClaimUiStore.setState({
      userNodes: [
        {
          id: "a1",
          type: "attachment",
          afterStepIndex: 0,
          fileName: "occupation.pdf",
          analysis: "idle",
        },
      ],
    });
    renderWithIntl(<AttachmentFromStore />);
    await user.click(screen.getByRole("button", { name: "Run AI document check" }));
    expect(screen.getByText("Checking…")).toBeInTheDocument();
    await act(async () => {
      await jest.advanceTimersByTimeAsync(1500);
    });
    expect(screen.getByText("Passed")).toBeInTheDocument();
    expect(
      screen.getByText(/Simulated check: document appears to match/i),
    ).toBeInTheDocument();
    jest.useRealTimers();
  });
});
