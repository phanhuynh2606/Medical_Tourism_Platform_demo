# Contact Form Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the contact page form fields with the 5.2 specification, replacing standard inputs with Shadcn components, adding IP geolocation, searchable countries, 18+ age verification, 10MB file upload checks, and proper Gender/Contact Method layouts.

**Architecture:** Utilize Shadcn UI components from `src/app/components/ui/` inside `src/app/components/pages/ContactPage.tsx` and integrate IP Geolocation via client-side fetch.

**Tech Stack:** React, Tailwind CSS, Lucide icons, Radix UI (Shadcn components)

---

### Task 1: Component Imports and Constants
Modify imports in `ContactPage.tsx` to include the required Shadcn primitives and define the constant nationalities.

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Update imports and add NATIONALITIES**

Update the imports at the top of the file to include the Shadcn components:
```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ChevronRight, Upload, X, CheckCircle, Sparkles, Check, ChevronsUpDown } from "lucide-react";
import { SERVICES } from "../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
```

Add the `NATIONALITIES` list after the `COUNTRIES` list in `ContactPage.tsx`:
```tsx
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
```

- [ ] **Step 2: Add Popover state inside ContactPage**

Inside the `ContactPage` component, define a state to track whether the Country dropdown popover is open:
```tsx
const [openCountry, setOpenCountry] = useState(false);
```

- [ ] **Step 3: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): add shadcn imports, nationalities list, and popover state"
```

---

### Task 2: IP Geolocation Auto-Detection
Implement the IP Geolocation check using `https://ipapi.co/json/` to auto-detect and pre-select the user's country of residence.

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Implement Geolocation effect**

Add the `useEffect` hook in `ContactPage` to perform geolocation auto-detection on mount:
```tsx
  useEffect(() => {
    // Only attempt auto-detect if countryOfResidence is not already set
    if (!form.countryOfResidence) {
      fetch("https://ipapi.co/json/")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch IP geolocation");
          return res.json();
        })
        .then((data) => {
          if (data && data.country_name) {
            const detectedCountry = data.country_name;
            // Check if the detected country exists in our COUNTRIES set
            if (COUNTRIES_SET.has(detectedCountry)) {
              update("countryOfResidence", detectedCountry);
            } else if (detectedCountry === "Viet Nam" && COUNTRIES_SET.has("Vietnam")) {
              update("countryOfResidence", "Vietnam");
            }
          }
        })
        .catch((err) => {
          console.warn("Geolocation auto-detect failed:", err);
        });
    }
  }, []);
```

- [ ] **Step 2: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): add IP geolocation auto-detection on mount"
```

---

### Task 3: Searchable Country Combobox
Replace the standard `<select>` dropdown for Country of Residence with a searchable combobox.

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Replace Country of Residence input markup**

Locate the `<select>` for `countryOfResidence` (around lines 420-449) and replace it with the Popover and Command combobox structure:
```tsx
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
                                    update("countryOfResidence", c);
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
```

- [ ] **Step 2: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): implement searchable country combobox"
```

---

### Task 4: Nationality select Dropdown
Replace the text input for Nationality with a Shadcn Select dropdown containing the list of nationalities.

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Replace Nationality input markup**

Locate the `<input type="text">` for `nationality` and replace it with the Shadcn `<Select>` implementation:
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): convert nationality input to select dropdown"
```

---

### Task 5: Date of Birth 18+ Age Validation
Add age calculation validation logic for eligibility (must be 18 or older).

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Update validateStep1 function**

Update `validateStep1` (around lines 118-129) to calculate age and enforce that the user must be at least 18 years old:
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): add 18+ age eligibility check for dateOfBirth"
```

---

### Task 6: Gender Radio Buttons
Replace the Gender selection dropdown with a horizontal RadioGroup.

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Replace Gender input markup**

Locate the `<select>` for `gender` and replace it with a horizontal `<RadioGroup>`:
```tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): change gender selection to RadioGroup"
```

---

### Task 7: Preferred Contact Method Checkboxes
Replace capsule toggle buttons for preferred contact method with checkboxes.

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Replace contact method selection markup**

Locate the `CONTACT_METHODS.map(...)` button loop (around lines 839-868) and replace it with a Grid of checkboxes:
```tsx
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mt-2">
                    {CONTACT_METHODS.map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={`contact-${method}`}
                          checked={form.preferredContactMethods.includes(method)}
                          onCheckedChange={() => toggleArray("preferredContactMethods", method)}
                        />
                        <Label
                          htmlFor={`contact-${method}`}
                          className="cursor-pointer text-sm font-normal text-gray-700 select-none"
                        >
                          {method}
                        </Label>
                      </div>
                    ))}
                  </div>
```

- [ ] **Step 2: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): change preferred contact methods to Checkbox group"
```

---

### Task 8: File Size Validation limit
Enforce a 10MB file limit on file selection.

**Files:**
- Modify: `src/app/components/pages/ContactPage.tsx`

- [ ] **Step 1: Update handleFileChange method**

Modify the `handleFileChange` function to reject files exceeding 10MB and set a visual error message:
```tsx
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    
    // Validate that each file is <= 10MB
    const exceedsLimit = newFiles.some((f) => f.size > 10 * 1024 * 1024);
    if (exceedsLimit) {
      setErrors((prev) => ({
        ...prev,
        files: "Each uploaded file must be under 10MB.",
      }));
      return;
    }

    // Clear file errors if any
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.files;
      return copy;
    });

    const combined = [...form.files, ...newFiles].slice(0, 5);
    update("files", combined);
  };
```

- [ ] **Step 2: Render file error message in JSX**

Locate the file input section and render the `errors.files` message if present:
```tsx
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
```

- [ ] **Step 3: Commit**
```bash
git add src/app/components/pages/ContactPage.tsx
git commit -m "feat(contact): implement 10MB file size limit validation"
```
