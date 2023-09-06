import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import SummaryWindow from "./summaryWindow";

describe("SummaryWindow", () => {
  const props = {
    id: "popUpWindow",
    paymentMethod: "paymentMethod",
    cashierName: "cashierName",
    quantity: "quantity",
    discount: "discount",
    totalPrice: "totalPrice",
    paymentDetails: "paymentDetails",
    placeOrder: jest.fn(),
  };

  test("should render a SummaryWindow properly", async () => {
    const element = render(
      <>
        <button
          role="fireButton"
          data-toggle="modal"
          data-target="#popUpWindow"
        />
        <SummaryWindow {...props} />
      </>
    );

    const button = screen.getByRole("fireButton");
    await fireEvent.click(button);
    // screen.debug();

    // logRoles(element.container);
    // const modal = screen.getByRole("ModalBase");
    // expect(modal).toBeInTheDocument();
  });
});
