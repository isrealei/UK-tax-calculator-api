const TAX_CONSTANT = {
  PERSONAL_ALLOWANCE: 12570,
  BASIC_RATE_LIMIT: 37700,
  HIGHER_RATE_LIMIT: 125140,

  HIGHINCOME_THRESHOLD: 100000,
  NI_NORMAL_THRESHOLD: 12570,
  NI_HIGHER_THRESHOLD: 50270,

  // tax rates
  BASIC_RATE: 0.2,
  HIGHER_RATE: 0.4,
  ADDITIONAL_RATE: 0.45,

  // NI rates
  NI_BASIC_RATE: 0.08,
  NI_HIGHER_RATE: 0.02,
};

export const taxCalculations = (annualSalary) => {
  const {
    PERSONAL_ALLOWANCE,
    HIGHINCOME_THRESHOLD,
    BASIC_RATE_LIMIT,
    HIGHER_RATE_LIMIT,
    BASIC_RATE,
    HIGHER_RATE,
    ADDITIONAL_RATE,
    NI_NORMAL_THRESHOLD,
    NI_HIGHER_THRESHOLD,
    NI_BASIC_RATE,
    NI_HIGHER_RATE,
  } = TAX_CONSTANT;

  let personalAllowance = PERSONAL_ALLOWANCE;
  if (annualSalary > HIGHINCOME_THRESHOLD) {
    const reduction = Math.floor((annualSalary - HIGHINCOME_THRESHOLD) / 2);
    personalAllowance = Math.max(0, PERSONAL_ALLOWANCE - reduction);
  }

  let taxableIncome = Math.max(0, annualSalary - personalAllowance);
  let taxOwed = 0;

  // income tax calculation
  if (taxableIncome <= BASIC_RATE_LIMIT) {
    const basicTax = taxableIncome * BASIC_RATE;
    taxOwed = basicTax;
  }
  if (taxableIncome > BASIC_RATE_LIMIT && taxableIncome <= HIGHER_RATE_LIMIT) {
    const basicTax = BASIC_RATE_LIMIT * BASIC_RATE;
    const higherTax = (taxableIncome - BASIC_RATE_LIMIT) * HIGHER_RATE;
    taxOwed = basicTax + higherTax;
  }
  if (taxableIncome > HIGHER_RATE_LIMIT) {
    const basicTax = BASIC_RATE_LIMIT * BASIC_RATE;
    const higherTax = (HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT) * HIGHER_RATE;
    const additionalTax = (taxableIncome - HIGHER_RATE_LIMIT) * ADDITIONAL_RATE;
    taxOwed = basicTax + higherTax + additionalTax;
  }

  // national insurance calculation
  let niOwed = 0;
  if (annualSalary > NI_NORMAL_THRESHOLD) {
    const basicNi =
      Math.min(annualSalary, NI_HIGHER_THRESHOLD) - NI_NORMAL_THRESHOLD;
    niOwed += basicNi * NI_BASIC_RATE;
  }
  if (annualSalary > NI_HIGHER_THRESHOLD) {
    const higherNi = annualSalary - NI_HIGHER_THRESHOLD;
    niOwed += higherNi * NI_HIGHER_RATE;
  }

  const totalDeduction = taxOwed + niOwed;
  const takeHome = annualSalary - totalDeduction;
  return {
    taxOwed,
    niOwed,
    totalDeduction,
    takeHome,
    taxableIncome,
    annualSalary,
  };
};
