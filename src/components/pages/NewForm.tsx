import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import { AlertCircle, LoaderCircle } from "lucid-react";
// import { validateUsername } from "@/api/user";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// const OrgNameSchema = z.string().min(3, "Enter the organization name");
// const emailSchema = z.string().min(3, "email invalid");
// const statusSchema = z.string().max(1);

const OrgNameSchema = z.string().min(3, "Enter the organization name");
const emailSchema = z.string().min(3, "email invalid");
const statusSchema = z.string().max(1);
// const phoneNumberSchema = z.number().max(10);
const phoneNumberSchema = z
  .string()
  .refine((val) => /^\d+$/.test(val), {
    message: "Phone number must be numeric.",
  })
  .transform((val) => Number(val)); // Convert string to number

export const NewForm = () => {
  const form = useForm({
    defaultValues: {
      org_name: "",
      email: "",
      status: "",
      phoneNumber: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        if (
          !value.org_name ||
          !value.email ||
          !value.status ||
          !value.phoneNumber
        ) {
          return "Please fill in all fields";
        }
      },
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Card className="w-3/5 bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          Organization Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form.Field
            name="org_name"
            validatorAdapter={zodValidator}
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChange: OrgNameSchema,
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor="org_name"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Organization name
                </Label>
                <div className="relative">
                  <Input
                    id="org_name"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {field.getMeta().isValidating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      {/* <LoaderCircle className="animate-spin" /> */}
                    </div>
                  )}
                </div>
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <form.Field
            name="email"
            validatorAdapter={zodValidator}
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChange: emailSchema,
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor="email"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {field.getMeta().isValidating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      {/* <LoaderCircle className="animate-spin" /> */}
                    </div>
                  )}
                </div>
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <form.Field
            name="status"
            validatorAdapter={zodValidator}
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChange: statusSchema,
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor="status"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Status
                </Label>
                <div className="relative">
                  <Input
                    id="status"
                    type="text"
                    className="w-1/5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.getMeta().isValidating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      {/* <LoaderCircle className="animate-spin" /> */}
                    </div>
                  )}
                </div>
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <form.Field
            name="phoneNumber"
            validatorAdapter={zodValidator}
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChange: phoneNumberSchema,
            }}
            children={(field) => (
              <div>
                <Label
                  htmlFor="phone_number"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone_number"
                    type="text"
                    className="w-1/5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.getMeta().isValidating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      {/* <LoaderCircle className="animate-spin" /> */}
                    </div>
                  )}
                </div>
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <form.Subscribe
            selector={(state) => state.errors}
            children={(errors) =>
              errors.length > 0 && (
                <Alert
                  variant={"destructive"}
                  className="bg-red-100 dark:bg-red-900"
                >
                  {/* <AlertCircle className="h-4 w-4" /> */}
                  <AlertTitle className="text-red-900 dark:text-red-100">
                    Error
                  </AlertTitle>
                  <AlertDescription className="text-red-900 dark:text-red-100">
                    {errors}
                  </AlertDescription>
                </Alert>
              )
            }
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={form.reset}
          className="text-gray-900 dark:text-gray-100"
        >
          Reset
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isValidating]}
          children={([canSubmit, isValidating]) => (
            <Button
              onClick={form.handleSubmit}
              disabled={!canSubmit || isValidating}
              className="bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-100"
            >
              Sign Up
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
};
