import React from "react";

export const fininstruments = [
  {
    title: "Bonds",
    instrument: "Securities",
    assetClass: "Debt (> 1 year)",
    risk: "low",
    shortDescription:
      "In finance, a bond is an instrument of indebtedness of the bond issuer to the holders. The most common types of bonds include municipal bonds and corporate bonds. Bonds can be in mutual funds or can be in private investing where a person would give a loan to a company or the government.",
  },
  {
    title: "Comercial Paper",
    instrument: "Securities",
    assetClass: "Debt (< 1 year)",
    risk: "low",
    shortDescription:
      "Commercial paper, in the global financial market, is an unsecured promissory note with a fixed maturity of rarely more than 270 days.",
  },
  {
    title: "Treasury Bills",
    instrument: "Securities",
    assetClass: "Debt (< 1 year)",
    risk: "low",
    shortDescription:
      "Treasury bills (T-bills) are zero-coupon bonds that mature in one year or less. They are bought at a discount of the par value and, instead of paying a coupon interest, are eventually redeemed at that par value to create a positive yield to maturity.",
  },
  {
    title: "Stock",
    instrument: "Securities",
    assetClass: "Equity",
    risk: "high",
    shortDescription:
      "Stock (also capital stock) of a corporation, is all of the shares into which ownership of the corporation is divided.[1] In American English, the shares are collectively known as 'stock'. A single share of the stock represents fractional ownership of the corporation in proportion to the total number of shares.",
  },
  {
    title: "Spot Foreign Exchange",
    instrument: "Other Cash",
    assetClass: "Foreign Exchange",
    risk: "high",
    shortDescription:
      "A foreign exchange spot transaction, also known as FX spot, is an agreement between two parties to buy one currency against selling another currency at an agreed price for settlement on the spot date. The exchange rate at which the transaction is done is called the spot exchange rate. ",
  },
  {
    title: "Loans",
    instrument: "Other Cash",
    assetClass: "Debt (> 1 year)",
    risk: "low",
    shortDescription:
      "In finance, a loan is the lending of money by one or more individuals, organizations, or other entities to other individuals, organizations etc. The recipient (i.e., the borrower) incurs a debt and is usually liable to pay interest on that debt until it is repaid as well as to repay the principal amount borrowed.",
  },
  {
    title: "Bond Futures",
    instrument: "Exchange-traded derivatives",
    assetClass: "Debt (> 1 year)",
    risk: "low",
    shortDescription:
      "In finance, a futures contract (sometimes called futures) is a standardized legal agreement to buy or sell something at a predetermined price at a specified time in the future, between parties not known to each other. The asset transacted is usually a commodity or financial instrument. ",
  },
  {
    title: "Options on bond futures",
    instrument: "Exchange-traded derivatives",
    assetClass: "Debt (> 1 year)",
    risk: "low",
    shortDescription:
      "In finance, an option is a contract which gives the buyer (the owner or holder of the option) the right, but not the obligation, to buy or sell an underlying asset or instrument at a specified strike price prior to or on a specified date, depending on the form of the option.",
  },
  {
    title: "Short-term interest rate futures",
    instrument: "Exchange-traded derivatives",
    assetClass: "Debt (< 1 year)",
    risk: "low",
    shortDescription:
      "An interest rate future is a financial derivative (a futures contract) with an interest-bearing instrument as the underlying asset.[1] It is a particular type of interest rate derivative.",
  },
  {
    title: "Stock options",
    instrument: "Exchange-traded derivatives",
    assetClass: "Equity",
    risk: "high",
    shortDescription:
      "In finance, an option is a contract which gives the buyer (the owner or holder of the option) the right, but not the obligation, to buy or sell an underlying asset or instrument at a specified strike price prior to or on a specified date, depending on the form of the option.",
  },
  {
    title: "Equity futures",
    instrument: "Exchange-traded derivatives",
    assetClass: "high",
    risk: "high",
    shortDescription:
    "In finance, a futures contract (sometimes called futures) is a standardized legal agreement to buy or sell something at a predetermined price at a specified time in the future, between parties not known to each other. The asset transacted is usually a commodity or financial instrument. ",
  },
  {
    title: "Interest rate swaps",
    instrument: "OTC Derivatives",
    assetClass: "Debt (> 1 year)",
    risk: "high",
    shortDescription:
      "In finance, an interest rate swap (IRS) is an interest rate derivative (IRD). It involves exchange of interest rates between two parties. In particular it is a 'linear' IRD and one of the most liquid, benchmark products. It has associations with forward rate agreements (FRAs), and with zero coupon swaps (ZCSs).",
  },
  {
    title: "Interest rate caps and floors",
    instrument: "OTC Derivatives",
    assetClass: "Debt (> 1 year)",
    risk: "high",
    shortDescription:
      "An interest rate cap is a type of interest rate derivative in which the buyer receives payments at the end of each period in which the interest rate exceeds the agreed strike price. An example of a cap would be an agreement to receive a payment for each month the LIBOR rate exceeds 2.5%. Similarly an interest rate floor is a derivative contract in which the buyer receives payments at the end of each period in which the interest rate is below the agreed strike price.",
  },
  {
    title: "Currency futures",
    instrument: "Exchange-traded derivatives",
    assetClass: "Foreign Exchange",
    risk: "high",
    shortDescription:
      "A currency future, also known as an FX future or a foreign exchange future, is a futures contract to exchange one currency for another at a specified date in the future at a price (exchange rate) that is fixed on the purchase date",
  },
  {
    title: "Interest rate options",
    instrument: "OTC Derivatives",
    assetClass: "Debt (> 1 year)",
    risk: "high",
    shortDescription:
      "An Interest rate option is a specific financial derivative contract whose value is based on interest rates. Its value is tied to an underlying interest rate, such as the yield on 10 year treasury notes."
  },
  {
    title: "Exotic derivatives",
    instrument: "OTC Derivatives",
    assetClass: "Debt (> 1 year)",
    risk: "high",
    shortDescription:
      "An exotic derivative, in finance, is a derivative which is more complex than commonly traded 'vanilla' products. This complexity usually relates to determination of payoff;[1] see option style. The category may also include derivatives with a non-standard subject matter (i.e., underlying), developed for a particular client or a particular market."
  },
  {
    title: "	Forward rate agreements",
    instrument: "OTC Derivatives",
    assetClass: "Debt (< 1 year)",
    risk: "high",
    shortDescription:
      "In finance, a forward rate agreement (FRA) is an interest rate derivative (IRD). In particular it is a linear IRD with strong associations with interest rate swaps (IRSs)."
  },
  {
    title: "Stock options",
    instrument: "OTC Derivatives",
    assetClass: "Equity",
    risk: "high",
    shortDescription:
    "In finance, an option is a contract which gives the buyer (the owner or holder of the option) the right, but not the obligation, to buy or sell an underlying asset or instrument at a specified strike price prior to or on a specified date, depending on the form of the option.",
  },
  {
    title: "Exotic derivatives",
    instrument: "OTC Derivatives",
    assetClass: "Equity",
    risk: "high",
    shortDescription:
      "An exotic derivative, in finance, is a derivative which is more complex than commonly traded 'vanilla' products. This complexity usually relates to determination of payoff;[1] see option style. The category may also include derivatives with a non-standard subject matter (i.e., underlying), developed for a particular client or a particular market."
  },
  {
    title: "Foreign exchange options",
    instrument: "OTC Derivatives",
    assetClass: "Foreign Exchange",
    risk: "high",
    shortDescription:
    "In finance, an option is a contract which gives the buyer (the owner or holder of the option) the right, but not the obligation, to buy or sell an underlying asset or instrument at a specified strike price prior to or on a specified date, depending on the form of the option.",
  },
  {
    title: "Outright forwards",
    instrument: "OTC Derivatives",
    assetClass: "Foreign Exchange",
    risk: "high",
    shortDescription:
    "In finance, an option is a contract which gives the buyer (the owner or holder of the option) the right, but not the obligation, to buy or sell an underlying asset or instrument at a specified strike price prior to or on a specified date, depending on the form of the option.",
  },
  {
    title: "Foreign exchange swaps",
    instrument: "OTC Derivatives",
    assetClass: "Foreign Exchange",
    risk: "high",
    shortDescription:
    "In finance, an option is a contract which gives the buyer (the owner or holder of the option) the right, but not the obligation, to buy or sell an underlying asset or instrument at a specified strike price prior to or on a specified date, depending on the form of the option.",
  },
  {
    title: "Currency swaps",
    instrument: "OTC Derivatives",
    assetClass: "Foreign Exchange",
    risk: "high",
    shortDescription:
    "In finance, an option is a contract which gives the buyer (the owner or holder of the option) the right, but not the obligation, to buy or sell an underlying asset or instrument at a specified strike price prior to or on a specified date, depending on the form of the option.",
  },
];

export default {
  fininstruments,
};
