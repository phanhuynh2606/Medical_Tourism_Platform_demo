# Design Specification: Contact Form Alignment with 5.2 Specification

Align the `ContactPage.tsx` form fields and validation rules to match the "5.2 Form Fields Specification" document.

## 1. Objectives

- Replace standard HTML input controls with Shadcn UI components.
- Implement IP Geolocation for `Country of Residence` auto-detection.
- Add Searchable filtering in the `Country of Residence` dropdown.
- Enforce the 18+ age validation check on `Date of Birth`.
- Restrict file upload sizes to 10MB per file in the `Medical Reports` uploader.
- Change `Gender` to Radio Buttons and `Preferred Contact Method` to Checkboxes.
- Ensure all styling remains visually premium and aligns with the existing theme.

## 2. Component Layout & Shadcn Primitives

We will utilize the following UI components from `src/app/components/ui/`:

- **Select** (`select.tsx`): For `Nationality` dropdown.
- **RadioGroup** (`radio-group.tsx`): For `Gender` selection.
- **Checkbox** (`checkbox.tsx`): For `Preferred Contact Method` list.
- **Popover** & **Command** (`popover.tsx`, `command.tsx`): To create a searchable Combobox for `Country of Residence`.
- **Label** (`label.tsx`): To pair with RadioGroup items and Checkboxes.

## 3. Data Flow & Geolocation

1. **IP Geolocation**:
   - On component mount (`useEffect`), fetch user location data from `https://ipapi.co/json/`.
   - Parse `country_name` and automatically select it in `form.countryOfResidence` if it hasn't been set by prefilled route state.
2. **File size verification**:
   - In `handleFileChange`, iterate through the selected files.
   - If any file size exceeds `10 * 1024 * 1024` bytes (10MB), cancel the upload and set an error message.
3. **Age validation**:
   - Parse `form.dateOfBirth`.
   - Calculate age in years relative to the current local date.
   - Fail validation in `validateStep1` if age is less than 18.

## 4. UI Refactoring Details

### Step 1 (Personal Details):
- **Country of Residence**:
  - Replace `<select>` with `<Popover>` wrapping `<Command>` (search input + list of countries).
  - Include auto-detect hook on mount.
- **Nationality**:
  - Introduce `NATIONALITIES` static string array.
  - Replace `<input type="text">` with `<Select>` dropdown listing common nationalities.
- **Date of Birth**:
  - Retain date input but show age validation error if computed age is under 18.
- **Gender**:
  - Replace `<select>` dropdown with a horizontal `<RadioGroup>` of: `Male`, `Female`, `Prefer not to say`.

### Step 3 (Documents & Consent):
- **Medical Reports / Documents**:
  - Apply the 10MB file limit check inside the React onChange handler.
- **Preferred Contact Method**:
  - Replace capsule buttons with a 2-column or 3-column checkbox group using `<Checkbox>` and `<Label>`.

## 5. Verification Plan

- **Manual Testing**:
  - Test country search input functionality.
  - Verify that reloading the contact page triggers the geolocation request and pre-selects the visitor's country.
  - Attempt to select a date of birth that evaluates to less than 18 years old, and confirm the step transition is blocked with a clear warning.
  - Attempt to upload files larger than 10MB and confirm they are rejected.
  - Test form step navigation (Step 1 -> 2 -> 3) and verify final submission payload.
