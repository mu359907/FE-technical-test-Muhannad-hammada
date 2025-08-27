import { Work_Sans } from "next/font/google";

export const workSans = Work_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const typography: any = {
  fontFamily: workSans.style.fontFamily,
  h1: {
    fontWeight: 600,
    fontSize: "2.25rem",
    lineHeight: "1.2",
  },
  h2: {
    fontWeight: 600,
    fontSize: "1.75rem",
    lineHeight: "1.2",
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: "1.2",
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: "normal",
  },
  h5: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "1.2",
  },
  h6: {
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: "1.2",
  },
  button: {
    textTransform: "capitalize",
    fontWeight: 400,
  },
  body1: {
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: "1.875rem",
  },
  body2: {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: "1.75rem",
  },
  body3: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.5rem",
  },
  body4: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.3125rem",
  },
  paragraph1: {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: "1.2",
  },
  paragraph2: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.2",
  },
  paragraph3: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.2",
  },
};

export default typography;
