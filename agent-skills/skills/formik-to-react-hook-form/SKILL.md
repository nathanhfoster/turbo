---
name: formik-to-react-hook-form
description: Migrate Formik forms to react-hook-form one component at a time while preserving validation and behavior. Use when migrating forms, replacing Formik, or converting useFormik to useForm.
---

# Formik to React Hook Form Migration

Migrates Formik forms to react-hook-form one component at a time while preserving validation and behavior.

**IMPORTANT**: Only change form-related logic. Do not modify UI components, styling, or other logic unrelated to form state management.

## Workflow

1. **Analyze the Formik usage**: Identify the form pattern (`useFormik()`, `<Formik>` render props, `<Form>`), fields/types, validation schema, child components receiving formik props, and complex interactions.

2. **Identify child components needing updates**: Look for components receiving `values`, `errors`, `touched`, `handleChange`, `handleBlur`, `setFieldValue`, `setFieldTouched` or using `useFormikContext()`, `<Field>`, `<ErrorMessage>`, `<FieldArray>`.

3. **Migrate parent component**:

   Update imports:
   ```tsx
   import { useForm, FormProvider } from 'react-hook-form';
   import { yupResolver } from '@hookform/resolvers/yup';
   ```

   Initialize hook:
   ```tsx
   const formMethods = useForm({
     defaultValues: initialValues,
     resolver: yupResolver(validationSchema),
     reValidateMode: 'onChange',
   });
   ```

   Wrap with FormProvider (preferred over prop drilling):
   ```tsx
   <FormProvider {...formMethods}>
     <form onSubmit={formMethods.handleSubmit(onSubmit)}>
       <ChildComponent />
     </form>
   </FormProvider>
   ```

   **Async data edge case**: If `initialValues` depends on async data, use `reset()`:
   ```tsx
   useEffect(() => {
     if (!isLoading && hasData) {
       formMethods.reset(initialValues);
     }
   }, [isLoading, hasData]);
   ```

4. **Update child components**:

   Replace `useFormikContext` with `useFormContext`:
   ```tsx
   import { useFormContext } from 'react-hook-form';
   const { control, setValue, watch, formState: { errors, isSubmitted } } = useFormContext();
   ```

   Use `isSubmitted` instead of `touchedFields` for error display.

   **For design system components (e.g., Slab), always use Controller**:
   ```tsx
   import { Controller } from 'react-hook-form';

   <Controller
     name="fieldName"
     control={control}
     render={({ field }) => (
       <InputText
         {...field}
         label="Field Label"
         message={errors.fieldName && isSubmitted ? errors.fieldName.message : undefined}
         status={errors.fieldName && isSubmitted ? 'error' : undefined}
       />
     )}
   />
   ```

   **CRITICAL: Never mix `value` prop with `register()` or Controller's `field`** — this prevents typing.

   For standard HTML inputs, use `register`:
   ```tsx
   <input {...register('fieldName')} />
   ```

   Update `setFieldValue` calls:
   ```tsx
   setValue('fieldName', value, { shouldValidate: true });
   ```

   Update error display:
   ```tsx
   {errors.fieldName && isSubmitted ? <div>{errors.fieldName.message}</div> : null}
   ```

5. **Verify ALL Formik imports are removed**: Search the entire directory tree for remaining Formik imports.

6. **Run TypeScript, ESLint, and Prettier** on all modified files. Fix TypeScript and ESLint errors only — not pre-existing warnings.

7. **Test migration**: Verify form validation, submission, error handling, initial values, and async data loading.

## Key Patterns

### Watching Values

Prefer `useWatch` for reactive value updates:
```tsx
import { useWatch } from 'react-hook-form';
const watchType = useWatch({ name: 'type', control });
```

For multiple fields, use array destructuring with a single `watch` call:
```tsx
const [title, materials, types] = watch(['title', 'materials', 'types']);
```

Do NOT use the deprecated callback pattern of `watch`.

### Generic Callbacks for Child Components

Replace Formik-specific props with generic callbacks:
```tsx
// Before
<TagSelect setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />
// After
<TagSelect onTagsChange={(tags) => setValue('tags', tags, { shouldValidate: true })} />
```

### Formik-to-RHF Mapping

| Formik | React Hook Form |
|--------|----------------|
| `<Formik>` | `useForm()` + `<form>` |
| `<Field>` | `{...register()}` or `<Controller>` |
| `<ErrorMessage>` | `errors.fieldName?.message` |
| `<FieldArray>` | `useFieldArray()` |
| `<Form>` | `<form>` |
| `useFormik()` | `useForm()` |
| `useFormikContext()` | `useFormContext()` |

## Summary Output

After migration, provide:
- Which parent component(s) were migrated and the Formik pattern they used
- Which child component(s) were updated
- How many Formik components were replaced
- How many errors were fixed
- Confirmation that all Formik imports were removed
