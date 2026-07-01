import { render, screen } from "@testing-library/react";
import BottomNavBar from "@/components/bottomNavbar";
import { Book, Calendar, CalendarDays, Home, Wallet } from "lucide-react";

// Mock the icons to verify they're rendered
jest.mock("lucide-react", () => ({
  Book: jest.fn(() => <div data-testid="book-icon" />),
  Calendar: jest.fn(() => <div data-testid="calendar-icon" />),
  CalendarDays: jest.fn(() => <div data-testid="calendar-event-icon" />),
  Home: jest.fn(() => <div data-testid="home-icon" />),
  Wallet: jest.fn(() => <div data-testid="money-icon" />),
}));

describe("BottomNavBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<BottomNavBar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    render(<BottomNavBar />);
    const nav = screen.getByRole("navigation");

    expect(nav).toHaveClass("fixed");
    expect(nav).toHaveClass("bottom-8");
    expect(nav).toHaveClass("rounded-2xl");
    expect(nav).toHaveClass("bg-[var(--main)]");
  });

  it("renders all navigation items", () => {
    render(<BottomNavBar />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(5);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  it("renders correct icons for each nav item", () => {
    render(<BottomNavBar />);

    expect(Home).toHaveBeenCalled();
    expect(Book).toHaveBeenCalled();
    expect(Calendar).toHaveBeenCalled();
    expect(CalendarDays).toHaveBeenCalled();
    expect(Wallet).toHaveBeenCalled();

    // Verify icon props
    const homeIconProps = (Home as jest.Mock).mock.calls[0][0];
    expect(homeIconProps.size).toBe("32");
    expect(homeIconProps.color).toBe("var(--text)");
  });

  it("has accessible buttons", () => {
    render(<BottomNavBar />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveClass("focus:outline-none");
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<BottomNavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
