import { getUserById } from "@/actions/get-user";
import { EditUserForm } from "@/components/ui-custom/forms/edit-user-form";

import { Title } from "@/components/ui-custom/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { redirect } from "next/navigation";

const UserDetailsPage = async ({ params }: { params: { userId: string } }) => {
  const { data: user } = await getUserById(Number(params.userId));

  if (!user) redirect("/dashboard/users");

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <Title>Usuarios</Title>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/users">Usuarios</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{user?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <EditUserForm data={user} />
    </div>
  );
};

export default UserDetailsPage;
