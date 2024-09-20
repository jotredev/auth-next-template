"use client";

import { UserNav } from "@/components/ui-custom/user-nav";

export const Header = () => {
  return (
    <header className="h-20 px-5 flex items-center justify-between">
      <section>LOGO</section>
      <section>
        <ul>
          <li>
            <UserNav />
          </li>
        </ul>
      </section>
    </header>
  );
};
