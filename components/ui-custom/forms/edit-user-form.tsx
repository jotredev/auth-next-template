"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { editUser } from "@/actions/edit-user";
import { formSchemaEditUser } from "@/types/user";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { User } from "@/lib/db/schema";

interface EditUserFormProps {
  data: User;
}

export const EditUserForm = ({ data }: EditUserFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaEditUser>>({
    resolver: zodResolver(formSchemaEditUser),
    defaultValues: {
      name: data.name!,
      email: data.email!,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaEditUser>) {
    setIsLoading(true);
    const res = await editUser({ values, id: data.id });

    if (res?.response === "success") {
      router.refresh();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jorge Luis Trejo"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="test@test.com"
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Si no deseas cambiar la contraseña, deja este campo vacío.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
          Editar usuario
        </Button>
      </form>
    </Form>
  );
};
