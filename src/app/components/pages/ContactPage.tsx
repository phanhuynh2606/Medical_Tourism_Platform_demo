import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ChevronRight, Upload, X, CheckCircle, Sparkles, Check, ChevronsUpDown } from "lucide-react";
import { SERVICES, getStoredLeads, saveLeads } from "../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

type Step = 1 | 2 | 3;

const generateRef = () =>
  `MTB-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;

const CONTACT_METHODS = ["Email", "WhatsApp", "Zalo", "WeChat", "Phone Call"];
const SOURCE_CHANNELS = [
  "Google Search",
  "Social Media",
  "Friend / Family Referral",
  "Doctor Referral",
  "WhatsApp",
  "Zalo",
  "WeChat",
  "Online Article / Blog",
  "Other",
];
const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Saudi Arabia",
  "UAE",
  "Vietnam",
  "China",
  "Russia",
  "Germany",
  "France",
  "Netherlands",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Japan",
  "South Korea",
  "India",
  "Nigeria",
  "South Africa",
];

const ISO_COUNTRY_MAP: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  AU: "Australia",
  CA: "Canada",
  SA: "Saudi Arabia",
  AE: "UAE",
  VN: "Vietnam",
  CN: "China",
  RU: "Russia",
  DE: "Germany",
  FR: "France",
  NL: "Netherlands",
  SG: "Singapore",
  MY: "Malaysia",
  TH: "Thailand",
  JP: "Japan",
  KR: "South Korea",
  IN: "India",
  NG: "Nigeria",
  ZA: "South Africa",
};

const COUNTRY_CALLING_CODES: Record<string, string> = {
  "United States": "+1",
  "United Kingdom": "+44",
  "Australia": "+61",
  "Canada": "+1",
  "Saudi Arabia": "+966",
  "UAE": "+971",
  "Vietnam": "+84",
  "China": "+86",
  "Russia": "+7",
  "Germany": "+49",
  "France": "+33",
  "Netherlands": "+31",
  "Singapore": "+65",
  "Malaysia": "+60",
  "Thailand": "+66",
  "Japan": "+81",
  "South Korea": "+82",
  "India": "+91",
  "Nigeria": "+234",
  "South Africa": "+27",
};

const NATIONALITIES = [
  "American",
  "British",
  "Australian",
  "Canadian",
  "Saudi Arabian",
  "Emirati",
  "Vietnamese",
  "Chinese",
  "Russian",
  "German",
  "French",
  "Singaporean",
  "Malaysian",
  "Thai",
  "Japanese",
  "Korean",
  "Indian",
  "Nigerian",
  "South African",
  "Other"
];

type Prefilled = {
  fullName?: string;
  phone?: string;
  countryOfResidence?: string;
  treatmentInterests?: string[];
};

export function ContactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilled: Prefilled =
    (location.state as { prefilled?: Prefilled } | null)?.prefilled ?? {};
  const hasPrefilled = !!(
    prefilled.fullName ||
    prefilled.phone ||
    prefilled.treatmentInterests?.length
  );

  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);

  const COUNTRIES_SET = new Set(COUNTRIES);

  const [form, setForm] = useState({
    // Step 1
    fullName: prefilled.fullName ?? "",
    email: "",
    phone: prefilled.phone ?? "",
    countryOfResidence:
      prefilled.countryOfResidence &&
      COUNTRIES_SET.has(prefilled.countryOfResidence)
        ? prefilled.countryOfResidence
        : "",
    nationality: "",
    dateOfBirth: "",
    gender: "",
    // Step 2
    treatmentInterests: prefilled.treatmentInterests ?? ([] as string[]),
    preferredDestinationCountry: "",
    estimatedTravelDate: "",
    conditionDescription: "",
    // Step 3
    files: [] as File[],
    preferredContactMethods: [] as string[],
    sourceChannel: "",
    gdprConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const e = { ...prev };
        delete e[field];
        return e;
      });
  };

  const toggleArray = (
    field: "treatmentInterests" | "preferredContactMethods",
    value: string,
  ) => {
    const arr = form[field];
    update(
      field,
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    );
  };

  const updateCountryAndPhoneCode = (newCountry: string) => {
    update("countryOfResidence", newCountry);
    const newCode = COUNTRY_CALLING_CODES[newCountry];
    if (!newCode) return;

    setForm((prev) => {
      const currentPhone = prev.phone.trim();
      
      if (!currentPhone) {
        return { ...prev, phone: `${newCode} ` };
      }

      const knownCodes = Object.values(COUNTRY_CALLING_CODES);
      const foundCode = knownCodes.find(code => currentPhone.startsWith(code));
      if (foundCode) {
        const rest = currentPhone.slice(foundCode.length).trim();
        return { ...prev, phone: `${newCode} ${rest}`.trim() + " " };
      }

      if (currentPhone.startsWith("+")) {
        const match = currentPhone.match(/^(\+\d+)\s*(.*)/);
        if (match) {
          const [_, oldCode, rest] = match;
          return { ...prev, phone: `${newCode} ${rest}`.trim() + " " };
        }
      }

      return { ...prev, phone: `${newCode} ${currentPhone}` };
    });
  };

  useEffect(() => {
    if (!form.countryOfResidence) {
      const setCountry = (detectedCountry: string, callingCode?: string) => {
        let matchedCountry = "";
        if (COUNTRIES_SET.has(detectedCountry)) {
          matchedCountry = detectedCountry;
        } else if (detectedCountry === "Viet Nam" && COUNTRIES_SET.has("Vietnam")) {
          matchedCountry = "Vietnam";
        } else {
          const mapped = ISO_COUNTRY_MAP[detectedCountry.toUpperCase()];
          if (mapped && COUNTRIES_SET.has(mapped)) {
            matchedCountry = mapped;
          }
        }

        if (matchedCountry) {
          update("countryOfResidence", matchedCountry);
          const finalPhoneCode = callingCode || COUNTRY_CALLING_CODES[matchedCountry];
          if (finalPhoneCode) {
            setForm((prev) => {
              if (!prev.phone.trim()) {
                const cleanCode = finalPhoneCode.startsWith("+") ? finalPhoneCode : `+${finalPhoneCode}`;
                return { ...prev, phone: `${cleanCode} ` };
              }
              return prev;
            });
          }
          return true;
        }
        return false;
      };

      // Try Provider 1: free.freeipapi.com
      fetch("https://free.freeipapi.com/api/json")
        .then((res) => {
          if (!res.ok) throw new Error("FreeIPAPI failed");
          return res.json();
        })
        .then((data) => {
          if (data && data.countryName) {
            const phoneCode = data.phoneCodes && data.phoneCodes[0] ? `+${data.phoneCodes[0]}` : undefined;
            setCountry(data.countryName, phoneCode);
          }
        })
        .catch((err) => {
          console.warn("FreeIPAPI failed, trying ipapi.co:", err);
          // Try Provider 2: ipapi.co
          fetch("https://ipapi.co/json/")
            .then((res) => {
              if (!res.ok) throw new Error("ipapi.co failed");
              return res.json();
            })
            .then((data) => {
              if (data && data.country_name) {
                setCountry(data.country_name, data.country_calling_code);
              }
            })
            .catch((err2) => {
              console.warn("ipapi.co failed, trying geolocation-db.com:", err2);
              // Try Provider 3: geolocation-db.com
              fetch("https://geolocation-db.com/json/")
                .then((res) => {
                  if (!res.ok) throw new Error("geolocation-db.com failed");
                  return res.json();
                })
                .then((data) => {
                  if (data && data.country_name) {
                    setCountry(data.country_name);
                  }
                })
                .catch((err3) => {
                  console.warn("geolocation-db.com failed, trying ipinfo.io:", err3);
                  // Try Provider 4: ipinfo.io
                  fetch("https://ipinfo.io/json")
                    .then((res) => {
                      if (!res.ok) throw new Error("ipinfo.io failed");
                      return res.json();
                    })
                    .then((data) => {
                      if (data && data.country) {
                        setCountry(data.country);
                      }
                    })
                    .catch((err4) => {
                      console.warn("All geolocation providers failed:", err4);
                    });
                });
            });
        });
    }
  }, []);

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.countryOfResidence) e.countryOfResidence = "Country is required";
    if (!form.nationality.trim()) e.nationality = "Nationality is required";
    if (!form.dateOfBirth) {
      e.dateOfBirth = "Date of birth is required";
    } else {
      const birth = new Date(form.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      if (age < 18) {
        e.dateOfBirth = "You must be at least 18 years old to submit this form";
      }
    }
    if (!form.gender) e.gender = "Gender is required";
    return e;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (form.treatmentInterests.length === 0)
      e.treatmentInterests = "Select at least one treatment";
    if (
      !form.conditionDescription.trim() ||
      form.conditionDescription.length < 10
    )
      e.conditionDescription =
        "Please describe your condition (min 10 characters)";
    return e;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (form.preferredContactMethods.length === 0)
      e.preferredContactMethods = "Select at least one contact method";
    if (!form.gdprConsent)
      e.gdprConsent = "You must accept the Privacy Policy to continue";
    return e;
  };

  const next = () => {
    let errs = {};
    if (step === 1) errs = validateStep1();
    if (step === 2) errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep((s) => (s + 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    const errs = validateStep3();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    const ref = generateRef();

    // Create and save new lead to localStorage
    const newLead = {
      id: Math.random().toString(36).substring(2, 11),
      referenceCode: ref,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      countryOfResidence: form.countryOfResidence,
      nationality: form.nationality || "Unknown",
      treatmentInterests: form.treatmentInterests,
      status: "NEW",
      priority: "NORMAL",
      sourceChannel: form.sourceChannel || "Direct",
      createdAt: new Date().toISOString(),
      assignedTo: null,
      gender: form.gender || null,
      dateOfBirth: form.dateOfBirth || null,
      conditionDescription: form.conditionDescription || null,
      preferredDestinationCountry: form.preferredDestinationCountry || null,
      estimatedTravelDate: form.estimatedTravelDate || null
    };

    const currentLeads = getStoredLeads();
    currentLeads.unshift(newLead);
    saveLeads(currentLeads);

    navigate(`/thank-you/${ref}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const oversized = newFiles.filter((f) => f.size > 10 * 1024 * 1024);
    const valid = newFiles.filter((f) => f.size <= 10 * 1024 * 1024);

    if (oversized.length > 0) {
      setErrors((prev) => ({
        ...prev,
        files: "Each file must be less than 10MB. Some files were not added.",
      }));
    } else {
      setErrors((prev) => {
        const nextErrs = { ...prev };
        delete nextErrs.files;
        return nextErrs;
      });
    }

    const combined = [...form.files, ...valid].slice(0, 5);
    setForm((prev) => ({ ...prev, files: combined }));
  };

  const inputStyle = (field: string) => ({
    height: "38px",
    border: `1px solid ${errors[field] ? "#DC3545" : "#CCCCCC"}`,
    borderRadius: "8px",
    padding: "6px 12px 6px 14px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  });

  const textareaStyle = (field: string) => ({
    border: `1px solid ${errors[field] ? "#DC3545" : "#CCCCCC"}`,
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    minHeight: "100px",
    resize: "vertical" as const,
  });

  const STEPS = [
    { num: 1, label: "Personal Details" },
    { num: 2, label: "Medical Info" },
    { num: 3, label: "Documents & Consent" },
  ];

  return (
    <div>
      {/* Header */}
      <div
        className="py-10 px-4"
        style={{
          background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <nav
            className="flex items-center justify-center gap-2 text-xs mb-4"
            style={{ color: "#8bb5d4" }}
          >
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <span style={{ color: "#0DCAF0" }}>Patient Inquiry</span>
          </nav>
          <h1
            className="text-white mb-2"
            style={{ fontSize: "32px", fontWeight: 700 }}
          >
            Free Patient Consultation
          </h1>
          <p style={{ color: "#a8cce0" }}>
            Complete the form below. Our team responds within 24 hours.
          </p>
        </div>
      </div>

      <div className="py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-2xl mx-auto">
          {/* Pre-fill notice */}
          {hasPrefilled && (
            <div
              className="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "#EEF7FF",
                border: "1px solid #c5ddf0",
              }}
            >
              <Sparkles
                size={15}
                style={{ color: "#005897", flexShrink: 0, marginTop: 2 }}
              />
              <p className="text-sm" style={{ color: "#005897" }}>
                We've pre-filled some details from your previous entry — just
                complete the remaining fields.
              </p>
            </div>
          )}

          {/* Progress stepper */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className="flex items-center flex-1 justify-between"
              >
                <div className="flex flex-col items-center flex-shrink-0 w-full">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                    style={{
                      backgroundColor:
                        step > s.num
                          ? "#198754"
                          : step === s.num
                            ? "#005897"
                            : "#DEE2E6",
                      color: step >= s.num ? "white" : "#6C757D",
                    }}
                  >
                    {step > s.num ? <CheckCircle size={16} /> : s.num}
                  </div>
                  <span
                    className="text-xs mt-1.5 text-center font-medium"
                    style={{ color: step === s.num ? "#005897" : "#6C757D" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-2 mb-5 transition-colors"
                    style={{
                      backgroundColor: step > s.num ? "#198754" : "#DEE2E6",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div
            className="bg-white rounded-2xl p-7 shadow-xl"
            style={{ border: "1px solid #DEE2E6" }}
          >
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h2
                  className="font-bold mb-5"
                  style={{ fontSize: "20px", color: "#333" }}
                >
                  Personal Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      style={inputStyle("fullName")}
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0D6EFD";
                        e.target.style.boxShadow =
                          "0 0 0 2px rgba(13,110,253,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.fullName
                          ? "#DC3545"
                          : "#CCCCCC";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    {errors.fullName && (
                      <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      style={inputStyle("email")}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0D6EFD";
                        e.target.style.boxShadow =
                          "0 0 0 2px rgba(13,110,253,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email
                          ? "#DC3545"
                          : "#CCCCCC";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#4F4F4F" }}
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 555 000 0000 (include country code)"
                    style={inputStyle("phone")}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0D6EFD";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.phone
                        ? "#DC3545"
                        : "#CCCCCC";
                    }}
                  />
                  {errors.phone && (
                    <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Country of Residence *
                    </label>
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCountry}
                          className="w-full justify-between font-normal hover:bg-white text-left px-3 py-2 text-sm"
                          style={{
                            height: "38px",
                            border: `1px solid ${errors.countryOfResidence ? "#DC3545" : "#CCCCCC"}`,
                            borderRadius: "8px",
                            backgroundColor: "white",
                            color: form.countryOfResidence ? "#333333" : "#9CA3AF",
                          }}
                        >
                          {form.countryOfResidence || "Select country"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-50">
                        <Command>
                          <CommandInput placeholder="Search country..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {COUNTRIES.map((c) => (
                                <CommandItem
                                  key={c}
                                  value={c}
                                  onSelect={() => {
                                    updateCountryAndPhoneCode(c);
                                    setOpenCountry(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.countryOfResidence === c ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {c}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.countryOfResidence && (
                      <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                        {errors.countryOfResidence}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Nationality *
                    </label>
                    <Select
                      value={form.nationality}
                      onValueChange={(val) => update("nationality", val)}
                    >
                      <SelectTrigger
                        className="w-full text-left"
                        style={{
                          height: "38px",
                          border: `1px solid ${errors.nationality ? "#DC3545" : "#CCCCCC"}`,
                          borderRadius: "8px",
                          backgroundColor: "white",
                          color: form.nationality ? "#333333" : "#9CA3AF",
                        }}
                      >
                        <SelectValue placeholder="e.g. British, American" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-white">
                        {NATIONALITIES.map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.nationality && (
                      <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                        {errors.nationality}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      style={inputStyle("dateOfBirth")}
                      value={form.dateOfBirth}
                      onChange={(e) => update("dateOfBirth", e.target.value)}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0D6EFD";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.dateOfBirth
                          ? "#DC3545"
                          : "#CCCCCC";
                      }}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Gender *
                    </label>
                    <RadioGroup
                      value={form.gender}
                      onValueChange={(val) => update("gender", val)}
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="gender-male" />
                        <Label htmlFor="gender-male" className="cursor-pointer text-sm font-normal text-gray-700">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="gender-female" />
                        <Label htmlFor="gender-female" className="cursor-pointer text-sm font-normal text-gray-700">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Prefer not to say" id="gender-other" />
                        <Label htmlFor="gender-other" className="cursor-pointer text-sm font-normal text-gray-700">Prefer not to say</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && (
                      <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={next}
                  className="w-full mt-2 text-white font-bold text-sm rounded-md transition-colors"
                  style={{ backgroundColor: "#DC3545", height: "44px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#BB2D3B";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#DC3545";
                  }}
                >
                  Continue to Medical Information →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <h2
                  className="font-bold mb-5"
                  style={{ fontSize: "20px", color: "#333" }}
                >
                  Medical Information
                </h2>

                <div>
                  <label
                    className="block text-xs font-semibold mb-2"
                    style={{ color: "#4F4F4F" }}
                  >
                    Treatment / Service Interest * (select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() =>
                          toggleArray("treatmentInterests", s.title)
                        }
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: form.treatmentInterests.includes(
                            s.title,
                          )
                            ? "#005897"
                            : "#F8F9FA",
                          color: form.treatmentInterests.includes(s.title)
                            ? "white"
                            : "#4F4F4F",
                          border: `1px solid ${form.treatmentInterests.includes(s.title) ? "#005897" : "#DEE2E6"}`,
                        }}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                  {errors.treatmentInterests && (
                    <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                      {errors.treatmentInterests}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Preferred Destination (optional)
                    </label>
                    <select
                      className="appearance-none bg-white w-full outline-none"
                      style={inputStyle("")}
                      value={form.preferredDestinationCountry}
                      onChange={(e) =>
                        update("preferredDestinationCountry", e.target.value)
                      }
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0D6EFD";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#CCCCCC";
                      }}
                    >
                      <option value="">No preference</option>
                      {[
                        "Thailand",
                        "India",
                        "Turkey",
                        "Malaysia",
                        "South Korea",
                        "Czech Republic",
                        "Cyprus",
                        "Other",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#4F4F4F" }}
                    >
                      Estimated Travel Date (optional)
                    </label>
                    <input
                      type="date"
                      style={inputStyle("")}
                      value={form.estimatedTravelDate}
                      onChange={(e) =>
                        update("estimatedTravelDate", e.target.value)
                      }
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0D6EFD";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#CCCCCC";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#4F4F4F" }}
                  >
                    Describe Your Medical Condition *{" "}
                    <span className="font-normal text-gray-400">
                      ({form.conditionDescription.length}/1000)
                    </span>
                  </label>
                  <textarea
                    placeholder="Please describe your current medical situation, diagnosis (if known), previous treatments, and what you're looking for..."
                    style={textareaStyle("conditionDescription")}
                    maxLength={1000}
                    value={form.conditionDescription}
                    onChange={(e) =>
                      update("conditionDescription", e.target.value)
                    }
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0D6EFD";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(13,110,253,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.conditionDescription
                        ? "#DC3545"
                        : "#CCCCCC";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {errors.conditionDescription && (
                    <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                      {errors.conditionDescription}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-md text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: "#F8F9FA",
                      color: "#4F4F4F",
                      border: "1px solid #DEE2E6",
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={next}
                    className="flex-[2] text-white font-bold text-sm rounded-md transition-colors"
                    style={{ backgroundColor: "#DC3545", height: "44px" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#BB2D3B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#DC3545";
                    }}
                  >
                    Continue to Documents & Consent →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <h2
                  className="font-bold mb-5"
                  style={{ fontSize: "20px", color: "#333" }}
                >
                  Documents & Consent
                </h2>

                {/* File upload */}
                <div>
                  <label
                    className="block text-xs font-semibold mb-2"
                    style={{ color: "#4F4F4F" }}
                  >
                    Upload Medical Reports (optional) — Max 5 files, 10MB each
                    (PDF, JPG, PNG)
                  </label>
                  <label
                    className="flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer transition-colors"
                    style={{
                      border: "2px dashed #CCCCCC",
                      padding: "24px",
                      backgroundColor: "#F8F9FA",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#005897";
                      e.currentTarget.style.backgroundColor = "#EEF7FF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#CCCCCC";
                      e.currentTarget.style.backgroundColor = "#F8F9FA";
                    }}
                  >
                    <Upload size={24} style={{ color: "#005897" }} />
                    <span
                      className="text-sm text-center"
                      style={{ color: "#4F4F4F" }}
                    >
                      Drag & drop or{" "}
                      <span style={{ color: "#005897", fontWeight: 600 }}>
                        browse files
                      </span>
                    </span>
                    <span className="text-xs" style={{ color: "#6C757D" }}>
                      Supports PDF, JPG, PNG · Max 5 files
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  {errors.files && (
                    <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                      {errors.files}
                    </p>
                  )}

                  {form.files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {form.files.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-lg text-sm"
                          style={{
                            backgroundColor: "#F0FFF4",
                            border: "1px solid #c3e6cb",
                          }}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <CheckCircle
                              size={14}
                              style={{ color: "#198754", flexShrink: 0 }}
                            />
                            <span
                              className="truncate"
                              style={{ color: "#333" }}
                            >
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              update(
                                "files",
                                form.files.filter((_, j) => j !== i),
                              )
                            }
                            className="flex-shrink-0 ml-2"
                          >
                            <X size={14} style={{ color: "#6C757D" }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact methods */}
                <div>
                  <label
                    className="block text-xs font-semibold mb-2"
                    style={{ color: "#4F4F4F" }}
                  >
                    Preferred Contact Method * (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-3">
                    {CONTACT_METHODS.map((method) => {
                      const isChecked = form.preferredContactMethods.includes(method);
                      const id = `contact-method-${method.toLowerCase().replace(/\s+/g, "-")}`;
                      return (
                        <div key={method} className="flex items-center space-x-2">
                          <Checkbox
                            id={id}
                            checked={isChecked}
                            onCheckedChange={() => toggleArray("preferredContactMethods", method)}
                          />
                          <Label
                            htmlFor={id}
                            className="text-sm font-normal text-gray-700 cursor-pointer"
                          >
                            {method}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  {errors.preferredContactMethods && (
                    <p className="text-xs mt-1" style={{ color: "#DC3545" }}>
                      {errors.preferredContactMethods}
                    </p>
                  )}
                </div>

                {/* Source channel */}
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#4F4F4F" }}
                  >
                    How did you hear about us? (optional)
                  </label>
                  <select
                    className="appearance-none bg-white w-full outline-none"
                    style={inputStyle("")}
                    value={form.sourceChannel}
                    onChange={(e) => update("sourceChannel", e.target.value)}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#0D6EFD";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#CCCCCC";
                    }}
                  >
                    <option value="">Please select</option>
                    {SOURCE_CHANNELS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* GDPR consent */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "#F8F9FA",
                    border: "1px solid #DEE2E6",
                  }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 rounded flex-shrink-0"
                      checked={form.gdprConsent}
                      onChange={(e) => update("gdprConsent", e.target.checked)}
                      style={{ accentColor: "#005897" }}
                    />
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: "#4F4F4F" }}
                    >
                      I consent to MedBridge Global Health collecting and
                      processing my personal and medical information for the
                      purpose of facilitating my healthcare consultation. I
                      understand my data will be handled in accordance with the{" "}
                      <Link
                        to="/privacy-policy"
                        className="underline"
                        style={{ color: "#005897" }}
                      >
                        Privacy Policy
                      </Link>{" "}
                      and GDPR requirements. I can withdraw consent at any time
                      by contacting privacy@medbridgehealth.com. *
                    </span>
                  </label>
                  {errors.gdprConsent && (
                    <p className="text-xs mt-2" style={{ color: "#DC3545" }}>
                      {errors.gdprConsent}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-md text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor: "#F8F9FA",
                      color: "#4F4F4F",
                      border: "1px solid #DEE2E6",
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="flex-[2] text-white font-bold text-sm rounded-md transition-colors disabled:opacity-70"
                    style={{ backgroundColor: "#DC3545", height: "44px" }}
                    onMouseEnter={(e) => {
                      if (!submitting)
                        e.currentTarget.style.backgroundColor = "#BB2D3B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#DC3545";
                    }}
                  >
                    {submitting ? "Submitting..." : "Submit My Inquiry →"}
                  </button>
                </div>

                <p className="text-center text-xs" style={{ color: "#6C757D" }}>
                  🔒 Your data is encrypted and never sold. Medical information
                  is only shared with hospitals you select.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
