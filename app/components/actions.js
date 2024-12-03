"use server";

export async function create(form) {
  const errors = {};

  if (form.email.length < 5) {
    errors.email = "Email too short";
  }

  if (form?.firstName?.length < 4) {
    errors.firstName = "Name too short";
  }

  // Check if any errors were found
  if (Object.keys(errors).length > 0) {
    console.log("errors", errors);
    return { success: false, errors };
  }

  // If no errors, return success response
  console.log("Form is valid", form);
  return { success: true, message: "Form submitted successfully" };
}
